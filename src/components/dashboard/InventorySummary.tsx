import { IoCashOutline, IoCubeOutline } from 'react-icons/io5'
import { getTotalProducts, getTotalProductsWithoutStock, getValueOfProductsWithoutStock, getValueTotalStock } from '@/actions/dashboard'

export async function InventorySummary() {
  const totalProducts = await getTotalProducts()
  const totalProductsWithoutStock = await getTotalProductsWithoutStock()
  const availableProducts = totalProducts - totalProductsWithoutStock

  const totalValue = await getValueTotalStock()

  const valueProductsWithoutStock = await getValueOfProductsWithoutStock()

  const currentStockValue = totalValue

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <IoCubeOutline className="h-6 w-6 text-blue-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-700">Productos Disponibles</h3>
          </div>
          <span className="text-2xl font-bold text-gray-900">{availableProducts}</span>
        </div>
        <div className="flex items-center text-sm">
          <span className="font-medium text-red-600">Productos sin stock: {totalProductsWithoutStock}</span>
        </div>
        <div className="flex items-center text-sm">
          <span className="font-medium text-gray-500">Total de productos: {totalProducts}</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <IoCashOutline className="h-6 w-6 text-green-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-700">Valor del Inventario</h3>
          </div>
          <span className="text-2xl font-bold text-gray-900">
            ${currentStockValue.toLocaleString('es-MX')} MXN
          </span>
        </div>

        <div className="flex items-center text-sm">
          <span className="font-medium text-red-600">
            Productos sin stock: ${valueProductsWithoutStock.toLocaleString('es-MX')} MXN
          </span>
        </div>

        <div className="flex items-center text-sm">
          <span className="font-medium text-gray-500">
            Valor total: ${(totalValue + valueProductsWithoutStock).toLocaleString('es-MX')} MXN
          </span>
        </div>
      </div>
    </div>
  )
}
