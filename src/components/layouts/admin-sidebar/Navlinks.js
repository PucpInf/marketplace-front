/**
 *  admin sidebar menu
 */
/* eslint-disable */
export default [
   {
      "menu_title": "reports",
      "type": "subMenu",
      "path": "javascript:void(0)",
      "icon": "poll",
      "users": ["admin", "provider"],
      "child_routes": [
         {
            "path": "/admin-panel/admin/reveneuStats",
            "menu_title": "Reveneu",
            "users": ["provider"],
            "icon": "arrow_right_alt"
         },
         // {
         //    "path": "/admin-panel/admin/downloadStats",
         //    "menu_title": "Downloads",
         //    "users": ["provider"],
         //    "icon": "arrow_right_alt"
         // }
      ]
   },
   {
      "menu_title": "invoices",
      "type": "null",
      "path": "/admin-panel/admin/invoices",
      "icon": "recent_actors",
      "users": ["admin", "provider"],
      "child_routes": null
   },
   {
      "menu_title": "products",
      "type": "subMenu",
      "path": "javascript:void(0)",
      "icon": "shopping_cart",
      "users": ["admin", "provider"],
      "child_routes": [
         {
            "path": "/admin-panel/admin/products",
            "menu_title": "products",
            "users": ["provider"],
            "icon": "arrow_right_alt"
         },
         {
            "path": "/admin-panel/admin/product-add",
            "menu_title": "add product",
            "users": ["provider"],
            "icon": "arrow_right_alt"
         },
         {
            "path": "/admin-panel/admin/product-requests",
            "menu_title": "product requests",            
            "users": ["admin"],
            "icon": "arrow_right_alt"
         },
         {
            "path": "/admin-panel/admin/provider-products",
            "menu_title": "Edit my products",           
            "users": ["provider"],
            "icon": "arrow_right_alt"
         },
         {
            "path": "/admin-panel/admin/app-requests",
            "menu_title": "app requests",                    
            "users": ["provider"],
            "icon": "arrow_right_alt"
         },
      ]
   },
   {
      "menu_title":"Providers",
      "type":"subMenu",
      "path":"javascript:void(0)",
      "icon":"people",
      "users": ["admin"],
      "child_routes":[
         {
            "path": "/admin-panel/admin/whitelist",
            "menu_title": "whitelist",
            "users": ["admin"],
            "icon": "arrow_right_alt"  
         }
      ]
   },
   {
      "menu_title": "profile",
      "type": "null",
      "path": "/admin-panel/admin/account",
      "icon": "account_circle",
      "users": [],
      "child_routes": null
   },
   {
      "menu_title": "go to site",
      "type": "null",
      "path": "/",
      "icon": "home",
      "users": [],
      "child_routes": null
   },
]   