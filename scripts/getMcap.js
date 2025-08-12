import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY;
const COLLECTION_ID = "milady-maker";

const main = async () => {
  try {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/nfts/${COLLECTION_ID}`,
      {
        headers: {
          Accept: "application/json",
          "x-cg-demo-api-key": COINGECKO_API_KEY,
        },
        timeout: 10000,
      }
    );

    const mcapUsd = data?.market_cap?.usd ?? null;
    console.log(mcapUsd);
  } catch (err) {
    const e = err.response || err;
    console.error("Request failed", {
      status: e.status || e.code,
      data: e.data || e.message,
    });
    process.exit(1);
  }
};

main();
