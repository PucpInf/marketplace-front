/**
 * App Constants
*/

export default {
   // AppLogo: require('../assets/images/header-logo.png'),         // App logo
   AppLogo: require('../assets/images/header-logo2.png'), 
   rtlLayout: false,                                             // RTL Layout
   adminLayout: false,                                            // Admin Layout
   navCollapsed: true,                                          // Sidebar Nav Layout
   algoliaConfig: {                                              // Algolia configuration
      appId: 'DXTYKSJYO8',
      apiKey: 'd1fd2a77fb30b48a50c8a72d0cd7196a',
      indexName: 'dev_content'
   },
   darkThemeColors: {
      darkBgColor: '#4f9599',
   },
   // Default locale
   locale: {
      locale: 'en',
      name: 'English',
      icon: 'en',
   },
   // Footer about description
   AboutUs: 'Here you can use rows and columns here to organize your footer content.Lorem ipsum dolor sit amet,consectetur adipisicing elit. Here you can use rows and columns here to organize your footer content. Lorem ipsum dolor sit amet,        consectetur adipisicing elit.',
   // Copyright text
   CopyrightText: '© All Rights Reversed | Made With Love by IRON NETWORK for better Web ',
   //general configurations
   apiUrl: 'https://marketplace-back.herokuapp.com',
   //  apiUrl: 'https://da87b804.ngrok.io',
   apiPayment: 'https://api.stripe.com/v1',
   paypalClientId: 'AVdfSuh1NllWFCChduj1Zey7huv9wTaQfSVOlqmlW-r7Z7BPBMF7CWO0I2H8I_ssADOaamxrntov2HT6',
   paypalClientSecret : 'EBjNFAc7rxO37UlWW_uQnM2vZ9lC_JR_yQD-xLsMXBPjdEdIL59PUz5dIzUEtyLJpmcSbGKtXJqDim8f',
}
