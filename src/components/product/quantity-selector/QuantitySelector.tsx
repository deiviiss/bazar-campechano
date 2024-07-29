import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5'

interface QuantitySelectorProps {
  quantity: number
  onQuantityChange: (
    value: number) => void
}

export const QuantitySelector = ({ quantity, onQuantityChange }: QuantitySelectorProps) => {
  const onValueChange = (value: number) => {
    if (quantity + value < 1) return

    if (quantity + value > 5) return

    onQuantityChange(quantity + value)
  }

  const onQuantityInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim() === '' ? 1 : parseInt(event.target.value, 10)

    if (isNaN(value) || value < 1) {
      onQuantityChange(1)
      return
    }

    onQuantityChange(value)
  }

  return (
    <>
      <div className="flex">
        <button onClick={() => { onValueChange(-1) }}>
          <IoRemoveCircleOutline size={30} />
        </button>

        <input
          className='w-20 mx-3 px-5 bg-gray-100 text-center rounded'
          value={quantity}
          onChange={onQuantityInputChange}
        />

        < button onClick={() => { onValueChange(+1) }}>
          <IoAddCircleOutline size={30} />
        </button>
      </div >
      {
        quantity > 5 && (
          <p className='text-red-500 text-sm p-1'>Cantidad máxima permitida: 5</p>
        )
      }
    </>
  )
}
