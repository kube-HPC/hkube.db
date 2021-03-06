const { expect } = require('chai');
const { generateWebhook } = require('./common');
let db = null;

describe('Webhooks-Result', () => {
    before(async () => {
        db = global.testParams.db;
    });
    it('should not throw error itemNotFound', async () => {
        const webhook = generateWebhook();
        const response = await db.webhooks.result.fetch(webhook);
        expect(response).to.be.null;
    });
    it('should throw conflict error', async () => {
        const webhook = generateWebhook();
        await db.webhooks.result.create(webhook);
        const promise = db.webhooks.result.create(webhook);
        await expect(promise).to.be.rejectedWith(/could not create/i);
    });
    it('should create and fetch webhook', async () => {
        const webhook = generateWebhook();
        const { jobId } = webhook;
        const res1 = await db.webhooks.result.create(webhook);
        const res2 = await db.webhooks.result.fetch({ jobId });
        expect(res1).to.eql(res2);
    });
    it('should create and update webhook', async () => {
        const webhook = generateWebhook();
        const { jobId } = webhook;
        const params = { ttl: 60 };
        await db.webhooks.result.create(webhook);
        await db.webhooks.result.update({ ...params, jobId });
        const { timestamp, ...res } = await db.webhooks.result.fetch({ jobId });
        expect(res).to.eql({ ...webhook, ...params });
    });
    it('should create and patch webhook', async () => {
        const webhook = generateWebhook();
        const { jobId } = webhook;
        const params = { ttl: 60 };
        await db.webhooks.result.create(webhook);
        await db.webhooks.result.patch({ ...params, jobId });
        const res = await db.webhooks.result.fetch({ jobId });
        const { key, ...data } = res;
        expect(data).to.eql({ ...webhook, ...params });
    });
    it('should create and delete webhook', async () => {
        const webhook = generateWebhook();
        const { jobId } = webhook;
        await db.webhooks.result.create(webhook);
        await db.webhooks.result.delete({ jobId });
        const response = await db.webhooks.result.fetch({ jobId });
        expect(response).to.be.null;
    });
    it('should create and fetch webhook list', async () => {
        const webhook1 = generateWebhook();
        const webhook2 = generateWebhook();
        const webhook3 = generateWebhook();
        await db.webhooks.result.create(webhook1);
        await db.webhooks.result.create(webhook2);
        await db.webhooks.result.create(webhook3);
        const list = await db.webhooks.result.fetchAll();
        expect(list.length).to.be.greaterThan(2);
    });
});
