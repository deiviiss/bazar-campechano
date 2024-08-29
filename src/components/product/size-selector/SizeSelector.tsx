import clsx from 'clsx'
import { type ClotheSize } from '@/interfaces'
interface SizeSelectorProps {
  selectedSize?: ClotheSize
  availableSizes: ClotheSize[]

  onSizeChange: (size: ClotheSize) => void
}

export const SizeSelector = ({ selectedSize, availableSizes, onSizeChange }: SizeSelectorProps) => {
  return (
    <div className="mb-5">
      <h3 className=' font-bold mb-4'>Tallas disponibles</h3>

      <div className="flex">
        {
          availableSizes.map(size => (
            <button
              key={size}
              onClick={() => { onSizeChange(size) }}
              className={clsx(
                'mx-2 hover:underline text-lg',
                { underline: size === selectedSize }
              )}
            >
              {size}
            </button>
          ))
        }
      </div>
    </div >

  )
}
