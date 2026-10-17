const currencyFormatter = new Intl.NumberFormat('tr-TR', {
  style: 'currency',
  currency: 'TRY',
  maximumFractionDigits: 2,
})

const raisedImageProductIds = new Set(['jewel-1', 'jewel-4', 'jewel-8', 'jewel-10', 'watch-3'])

function getStockStatus(stock) {
  if (stock === 0) return { label: 'Tükendi', className: 'out-of-stock' }
  if (stock < 5) return { label: 'Az kaldı', className: 'low-stock' }
  return { label: 'Stokta', className: 'in-stock' }
}

export default function ProductCard({ product, onEdit, onDelete }) {
  const stockStatus = getStockStatus(product.stock)

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        {product.image ? (
          <img
            className={`product-image ${raisedImageProductIds.has(product.id) ? 'product-image-raised' : ''}`}
            src={product.image}
            alt={product.name}
            onError={(event) => {
              event.currentTarget.hidden = true
            }}
          />
        ) : null}
        <span className={`stock-pill ${stockStatus.className}`}>
          <span className="stock-dot" />
          {stockStatus.label}
        </span>
      </div>
      <div className="product-card-body">
        <p className="product-category">{product.category}</p>
        <h2>{product.name}</h2>
        <div className="product-meta">
          <strong>{currencyFormatter.format(product.price)}</strong>
          <span>{product.stock} adet</span>
        </div>
        <div className="product-actions">
          <button className="text-button" type="button" onClick={() => onEdit(product)}>
            Düzenle
          </button>
          <button
            className="text-button delete-button"
            type="button"
            onClick={() => onDelete(product)}
          >
            Sil
          </button>
        </div>
      </div>
    </article>
  )
}