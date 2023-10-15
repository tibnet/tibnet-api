export default {
    port: Number(process.env.PORT || 3000),
    host: process.env.HOST || "localhost",
    tibnetAPI: process.env.TIBNET_API!,
    tibnetSecret: process.env.TIBNET_SECRET!,
    smscToken: process.env.SMSC_TOKEN!,
}