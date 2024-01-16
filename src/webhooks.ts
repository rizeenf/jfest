import express from "express";
import { WebhookRequest } from "./server";
import { stripe } from "./lib/stripe";
import type Stripe from "stripe";
import { getPayloadClient } from "./get-payload";
import { Product } from "./payload-types";
// import { Resend } from "resend";
import { ReceiptEmailHTML } from "./components/emails/ReceiptEmail";
import nodemailer from "nodemailer";

// const resend = new Resend(process.env.RESEND_API_KEY);

export const stripeWebhookHandler = async (
  req: express.Request,
  res: express.Response
) => {
  // Validate that this request actually come frome Stripe
  const webhookRequest = req as any as WebhookRequest;
  const body = webhookRequest.rawBody;
  const signature = req.headers["stripe-signature"] || "";

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err) {
    return res
      .status(400)
      .send(
        `Webhook Error : ${
          err instanceof Error ? err.message : "Unknown Error"
        }`
      );
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (!session.metadata?.userId || !session.metadata?.orderId) {
    return res.status(400).send("Webhook Error : No user present in Metadata");
  }

  // Update _isPaid value of this order
  if (event.type === "checkout.session.completed") {
    const payload = await getPayloadClient();

    const { docs: users } = await payload.find({
      collection: "users",
      where: {
        id: {
          equals: session.metadata.userId,
        },
      },
    });

    const [user] = users;

    if (!user) return res.status(404).send({ error: "No such user exists." });

    const { docs: orders } = await payload.find({
      collection: "orders",
      depth: 2,
      where: {
        id: {
          equals: session.metadata.orderId,
        },
      },
    });

    const [order] = orders;

    if (!user) return res.status(404).send({ error: "No such user exists." });

    await payload.update({
      collection: "orders",
      data: {
        _isPaid: true,
      },
      where: {
        id: {
          equals: session.metadata.orderId,
        },
      },
    });

    await payload.sendEmail({
      from: "rize.poke1@gmail.com",
      to: [user.email],
      subject: "Thanks for your order! This is your receipt.",
      html: ReceiptEmailHTML({
        date: new Date(),
        email: user.email,
        orderId: session.metadata.orderId,
        products: order.products as Product[],
      }),
    });

    //Send receipt

    // Send Receipt Email

    try {
      // const data2 = await payload.init({
      //   email: {
      //     fromName: "MyJFest",
      //     fromAddress: "rize.poke1@gmail.com",
      //     transport: transporter,
      //   },
      //   secret: process.env.PAYLOAD_SECRET,
      //   local: init
      // });
      const data = await payload.sendEmail({
        from: "rize.poke1@gmail.com",
        to: [user.email],
        subject: "Thanks for your order! This is your receipt.",
        html: ReceiptEmailHTML({
          date: new Date(),
          email: user.email,
          orderId: session.metadata.orderId,
          products: order.products as Product[],
        }),
      });

      // const data = await resend.emails.send({
      //   from: "MyJfest <rize.poke1@gmail.com>",
      //   to: [user.email],
      //   subject: "Thanks for your order! This is your receipt.",
      //   html: ReceiptEmailHTML({
      //     date: new Date(),
      //     email: user.email,
      //     orderId: session.metadata.orderId,
      //     products: order.products as Product[],
      //   }),
      // });
      res.status(200).json({ data });
      // console.log("email send");
      // res.status(200).json({ success: true });
    } catch (err) {
      res.status(500).json({ err });
    }
  }

  return res.status(200).send();
};
