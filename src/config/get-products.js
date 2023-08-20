import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
// const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
  url: process.env.VUE_APP_WP_SITE_URL,
  consumerKey: process.env.VUE_APP_WC_KEY,
  consumerSecret: process.env.VUE_APP_WC_SECRET,
  version: "wc/v3"
});

/**
 * Get Products.
 *
 * Endpoint /api/get-products or '/api/get-products?perPage=2'
 *
 * @param req
 * @param res
 * @return {Promise<void>}
 */
export default async function handler(req, res) {
	
	const responseData = {
		success: false,
		products: []
	}
	
	const { perPage } = req?.query ?? {};
	
	try {
		const { data } = await api.get(
			'products',
			{
				per_page: perPage || 50
			}
		);
		
		responseData.success = true;
		responseData.products = data;
		
		res.json( responseData );
		
	} catch ( error ) {
		responseData.error = error.message;
		res.status( 500 ).json( responseData  );
	}
}