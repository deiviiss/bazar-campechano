// aut
export * from './auth/ButtonLogout'

// orders
export { OrderStatus } from './orders/OrderStatus'
export { MenuOptions } from './orders-table/MenuOptions'
export { StatusNameWithIcon } from './orders/StatusNameWithIcon'
export { PaymentMethodNameWithIcon, paymentMethodNameSpanish } from './orders/PaymentMethodNameWithIcon'
export { CardOrder } from './orders/card/CardOrder'
export { CardOrderAdmin } from './orders/card/CardOrderAdmin'
export { TableOrder } from './orders-table/TableOrder'

// Providers
export * from './providers/Providers'

// payment-methods
export * from './payment-methods/paypal/PayPalButton'
export { TransferButton } from './payment-methods/transfer/TransferButton'
export { CashButton } from './payment-methods/cash/CashButton'

// Products
export { NewProductsGrid } from './products/product-grid/NewProductsGrid'
export { NewProductItemClothe } from './products/product-grid/NewProductItemClothe'
export { NewProductItemShoe } from './products/product-grid/NewProductItemShoe'
export { NewProductItemToy } from './products/product-grid/NewProductItemToy'

export { FeaturedProductsGrid } from './products/product-grid/FeaturedProductsGrid'
export { FeaturedProductItemClothe } from './products/product-grid/FeaturedProductItemClothe'
export { FeaturedProductItemShoe } from './products/product-grid/FeaturedProductItemShoe'
export { FeaturedProductItemToy } from './products/product-grid/FeaturedProductItemToy'

// Product
export * from './product/quantity-selector/QuantitySelector'
export * from './product/size-selector/SizeSelector'
export { ProductSlideshow } from './product/slideshow/ProductSlideshow'
export { ProductCarrousel } from './product/carrousel/ProductCarrousel'
export { AccordionDescription } from './product/accordion-description/AccordionDescription'
export * from './product/stock-label/StockLabel'
export * from './product/product-form/ProductForm'
export * from './product/product-image/ProductImage'
export { ProductTable } from './products/product-table/ProductTable'
export { ProductSearch } from './product/product-search/ProductSearch'
export { CardProduct } from './product/card/CardProduct'
export { DeleteButtonProduct } from './product/buttons/DeleteButton'
export { ButtonShare } from './product/buttons/ButtonShare'

// UI
export * from './ui/sidebar/Sidebar'
export * from './ui/title/Title'
export * from './ui/top-menu/TopMenu'
export * from './ui/not-found/PageNotFound'
export * from './ui/pagination/Pagination'
export * from './ui/button-back-page/ButtonBackPage'
export { ButtonBack } from './ui/button-back/ButtonBack'

// users
export { UsersTable } from './users/table/UsersTable'
export { CardUser } from './users/card/CardUser'
export { EditForm } from './users/edit-form/EditForm'
export { MenuOptionsUser } from './users/table/MenuOptions'

// Footer
export * from './footer/Footer'
