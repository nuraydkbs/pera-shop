import { useState } from 'react'
import { productCategories } from '../utils/products.js'

const emptyProduct = {
  name: '',
  category: '',
  price: '',
  stock: '',
  image: '',
}

export default function ProductForm({ product, onSave, onCancel }) {
  const [formValues, setFormValues] = useState(product ?? emptyProduct)

  function handleChange(event) {
    const { name, value } = event.target
    setFormValues((currentValues) => ({ ...currentValues, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSave({
      ...formValues,
      name: formValues.name.trim(),
      category: formValues.category.trim(),
      price: Number(formValues.price),
      stock: Number(formValues.stock),
      image: formValues.image.trim(),
    })
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <label>
        Ürün adı
        <input
          autoFocus
          name="name"
          value={formValues.name}
          onChange={handleChange}
          placeholder="Örn. Seramik vazo"
          required
          maxLength={70}
        />
      </label>
      <div className="form-row">
        <label>
          Kategori
          <select
            name="category"
            value={formValues.category}
            onChange={handleChange}
            required
          >
            <option value="">Kategori seç</option>
            {productCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label>
          Fiyat (₺)
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formValues.price}
            onChange={handleChange}
            placeholder="0,00"
            required
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Stok adedi
          <input
            name="stock"
            type="number"
            min="0"
            step="1"
            value={formValues.stock}
            onChange={handleChange}
            placeholder="0"
            required
          />
        </label>
        <label>
          Görsel adresi
          <input
            name="image"
            type="url"
            value={formValues.image}
            onChange={handleChange}
            placeholder="https://..."
          />
        </label>
      </div>
      <div className="form-actions">
        <button className="button button-secondary" type="button" onClick={onCancel}>
          Vazgeç
        </button>
        <button className="button button-primary" type="submit">
          {product ? 'Değişiklikleri kaydet' : 'Ürünü ekle'}
        </button>
      </div>
    </form>
  )
}