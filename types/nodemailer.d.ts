declare module "nodemailer" {
  type TransportOptions = {
    host?: string;
    port?: number;
    secure?: boolean;
    auth?: { user?: string; pass?: string };
  };

  type MessageOptions = {
    to?: string;
    from?: string;
    subject?: string;
    html?: string;
  };

  export function createTransport(options: TransportOptions): {
    sendMail(message: MessageOptions): Promise<unknown>;
  };

  const nodemailer: { createTransport: typeof createTransport };
  export default nodemailer;
}
