import Link from 'next/link'
import { DeleteButtonProduct, ProductImage } from '@/components'
import { type Size, type ProductWithStock, type ValidGender } from '@/interfaces'
import { currencyFormat } from '@/utils'

interface Props {
  products: ProductWithStock[]
}

const genderSpanish: Record<ValidGender, string> = {
  men: 'Hombre',
  women: 'Mujer',
  kid: 'Niño',
  unisex: 'Unisex'
}

export const ProductTable = ({ products }: Props) => {
  if (products.length === 0 || !products) {
    return (
      <div className='flex w-full items-center justify-center'>
        <p>No hay productos con esos datos</p>
      </div>
    )
  }

  return (
    <table className="min-w-full">
      <thead className="bg-gray-200 border-b">
        <tr>
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Imagen
          </th>
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Titulo
          </th>
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Precio
          </th>
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Género
          </th>
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Inventario
          </th>
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Talla
          </th>
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Opciones
          </th>
        </tr>
      </thead>
      <tbody>
        {
          products?.map(product => {
            return (
              <tr
                key={`${product.id}-${product.stock.size}`}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link href={`/product/${product.slug}`}
                  >
                    <ProductImage
                      src={product.images[0].url}
                      alt={product.title}
                      width={80}
                      height={80}
                      className='w-20 h-20 object-cover rounded'
                    />
                  </Link>
                </td>
                <td
                  className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap hover:underline">
                  <Link href={`/admin/product/${product.slug}?size=${product.stock.size}`}>
                    {product.title}
                  </Link>
                </td>
                <td
                  className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap font-bold"
                >
                  {currencyFormat(Number(product.price))}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {genderSpanish[product.gender]}
                </td>
                <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                  {product.stock.inStock}
                </td>
                <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                  {product.stock.size}
                </td>
                <td className="text-sm text-gray-900 font-bold px-3 py-4 whitespace-nowrap">
                  <DeleteButtonProduct id={`${product.id}`} size={product.stock.size as Size} />
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}
