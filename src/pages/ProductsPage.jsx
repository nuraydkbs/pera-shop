import { useEffect, useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import ProductForm from '../components/ProductForm.jsx'
import { loadProducts, saveProducts } from '../utils/products.js'

const currencyFormatter = new Intl.NumberFormat('tr-TR', {
  style: 'currency',
  currency: 'TRY',
  maximumFractionDigits: 0,
})

export default function ProductsPage() {
  const [products, setProducts] = useState(loadProducts)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tümü')
  const [editingProduct, setEditingProduct] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    saveProducts(products)
  }, [products])

  const categories = useMemo(
    () => ['Tümü', ...new Set(products.map((product) => product.category))],
    [products],
  )

  const visibleProducts = products.filter((product) => {
    const searchValue = searchTerm.trim().toLocaleLowerCase('tr-TR')
    const matchesSearch =
      product.name.toLocaleLowerCase('tr-TR').includes(searchValue) ||
      product.category.toLocaleLowerCase('tr-TR').includes(searchValue)
    const matchesCategory =
      selectedCategory === 'Tümü' || product.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const totalStock = products.reduce((total, product) => total + product.stock, 0)
  const inventoryValue = products.reduce(
    (total, product) => total + product.price * product.stock,
    0,
  )

  function openNewProductForm() {
    setEditingProduct(null)
    setIsFormOpen(true)
  }

  function openEditProductForm(product) {
    setEditingProduct(product)
    setIsFormOpen(true)
  }

  function closeForm() {
    setIsFormOpen(false)
    setEditingProduct(null)
  }

  function saveProduct(productDetails) {
    if (editingProduct) {
      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === editingProduct.id
            ? { ...product, ...productDetails }
            : product,
        ),
      )
    } else {
      setProducts((currentProducts) => [
        { id: crypto.randomUUID(), ...productDetails },
        ...currentProducts,
      ])
    }
    closeForm()
  }

  function deleteProduct(productToDelete) {
    const confirmed = window.confirm(`"${productToDelete.name}" ürününü silmek istiyor musun?`)
    if (!confirmed) return

    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== productToDelete.id),
    )
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Pera Shop ana sayfa">
          <span className="brand-mark">p.</span>
          <span>PERA SHOP</span>
        </a>
      </header>

      <section className="page-content">
        <div className="page-heading">
          <div>
            <h1>Ürünler</h1>
            <p className="page-description">Ürün kataloğun ve stok durumun.</p>
          </div>
          <button className="button button-primary add-button" onClick={openNewProductForm}>
            <span aria-hidden="true">+</span> Yeni ürün ekle
          </button>
        </div>

        <section className="summary-grid" aria-label="Mağaza özeti">
          <article className="summary-item">
            <span className="summary-label">Toplam ürün</span>
            <strong>{products.length}</strong>
            <span className="summary-footnote">katalogda</span>
          </article>
          <article className="summary-item">
            <span className="summary-label">Toplam stok</span>
            <strong>{totalStock}</strong>
            <span className="summary-footnote">adet ürün</span>
          </article>
          <article className="summary-item summary-value">
            <span className="summary-label">Stok değeri</span>
            <strong>{currencyFormatter.format(inventoryValue)}</strong>
            <span className="summary-footnote">tahmini toplam</span>
          </article>
        </section>

        <section className="catalog-section">
          <div className="catalog-heading">
            <div>
              <h2>Ürün kataloğu</h2>
              <span className="result-count">{visibleProducts.length} ürün</span>
            </div>
            <label className="search-field">
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Ürün ara"
                aria-label="Ürün ara"
              />
            </label>
          </div>

          <div className="category-filters" aria-label="Kategori filtresi">
            {categories.map((category) => (
              <button
                className={`filter-button ${selectedCategory === category ? 'is-active' : ''}`}
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {visibleProducts.length > 0 ? (
            <div className="product-grid">
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={openEditProductForm}
                  onDelete={deleteProduct}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-mark" aria-hidden="true">○</span>
              <h2>Ürün bulunamadı</h2>
              <p>Arama veya kategori seçimini değiştirip tekrar dene.</p>
              {products.length === 0 ? (
                <button className="button button-primary" onClick={openNewProductForm}>
                  İlk ürünü ekle
                </button>
              ) : null}
            </div>
          )}
        </section>
      </section>

      {isFormOpen ? (
        <div className="modal-backdrop" onMouseDown={closeForm}>
          <section
            className="product-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-form-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="modal-heading">
              <div>
                <p className="eyebrow">ÜRÜN KATALOĞU</p>
                <h2 id="product-form-title">
                  {editingProduct ? 'Ürünü düzenle' : 'Yeni ürün'}
                </h2>
              </div>
              <button className="close-button" type="button" onClick={closeForm} aria-label="Kapat">
                ×
              </button>
            </div>
            <ProductForm
              key={editingProduct?.id ?? 'new-product'}
              product={editingProduct}
              onSave={saveProduct}
              onCancel={closeForm}
            />
          </section>
        </div>
      ) : null}
    </main>
  )
}