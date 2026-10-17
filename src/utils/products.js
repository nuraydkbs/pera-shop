export const productCategories = ['Küpe', 'Kolye', 'Yüzük', 'Bileklik', 'Broş', 'Saat']

export const initialProducts = [
  {
    id: 'jewel-1',
    name: 'İnci damla küpe',
    category: 'Küpe',
    price: 890,
    stock: 14,
    image:
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'jewel-2',
    name: 'İnce altın zincir kolye',
    category: 'Kolye',
    price: 1490,
    stock: 8,
    image:
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'jewel-3',
    name: 'Organik form yüzük',
    category: 'Yüzük',
    price: 1250,
    stock: 6,
    image:
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'jewel-4',
    name: 'Minik taşlı halka küpe',
    category: 'Küpe',
    price: 1150,
    stock: 11,
    image:
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'jewel-5',
    name: 'İnci detaylı bileklik',
    category: 'Bileklik',
    price: 980,
    stock: 9,
    image:
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'jewel-6',
    name: 'Gümüş ay kolye',
    category: 'Kolye',
    price: 1320,
    stock: 5,
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'jewel-7',
    name: 'Renkli taşlı yüzük',
    category: 'Yüzük',
    price: 1680,
    stock: 4,
    image:
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'jewel-8',
    name: 'Oval vintage broş',
    category: 'Broş',
    price: 740,
    stock: 3,
    image:
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'jewel-9',
    name: 'Katmanlı zincir kolye',
    category: 'Kolye',
    price: 1890,
    stock: 7,
    image:
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'jewel-10',
    name: 'Sedefli charm bileklik',
    category: 'Bileklik',
    price: 1590,
    stock: 2,
    image:
      'https://images.unsplash.com/photo-1786052337516-9fb23fcf36de?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'watch-1',
    name: 'Pudra kadranlı klasik saat',
    category: 'Saat',
    price: 2890,
    stock: 6,
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'watch-2',
    name: 'İnce altın çerçeveli saat',
    category: 'Saat',
    price: 3450,
    stock: 4,
    image:
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'watch-3',
    name: 'Zarif çelik bilezikli saat',
    category: 'Saat',
    price: 3190,
    stock: 8,
    image:
      'https://images.pexels.com/photos/36812422/pexels-photo-36812422.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
]

const storageKey = 'dukkanim-products'
const jewelryStoreKey = 'dukkanim-jewelry-store-v4'
const seedProductsById = new Map(initialProducts.map((product) => [product.id, product]))
const allowedCategories = new Set(productCategories)

function inferCategory(product) {
  const name = product.name.toLocaleLowerCase('tr-TR')
  if (name.includes('küpe')) return 'Küpe'
  if (name.includes('kolye')) return 'Kolye'
  if (name.includes('yüzük')) return 'Yüzük'
  if (name.includes('bileklik')) return 'Bileklik'
  if (name.includes('broş')) return 'Broş'
  if (name.includes('saat')) return 'Saat'
  return 'Yüzük'
}

export function loadProducts() {
  try {
    const savedProducts = localStorage.getItem(storageKey)
    if (!savedProducts) {
      localStorage.setItem(jewelryStoreKey, 'ready')
      return initialProducts
    }

    const parsedProducts = JSON.parse(savedProducts)
    if (!Array.isArray(parsedProducts)) return initialProducts
    if (localStorage.getItem(jewelryStoreKey) === 'ready') return parsedProducts

    const jewelryProducts = parsedProducts
      .filter((product) => {
        return allowedCategories.has(product.category) || product.category === 'Takı'
      })
      .map((product) => {
        const seedProduct = seedProductsById.get(product.id)
        const category =
          seedProduct?.category ??
          (product.category === 'Takı' ? inferCategory(product) : product.category)
        const image = ['jewel-4', 'jewel-10', 'watch-3'].includes(product.id)
          ? seedProduct.image
          : product.image

        return { ...product, category, image }
      })
    const existingIds = new Set(jewelryProducts.map((product) => product.id))
    const migratedProducts = [
      ...jewelryProducts,
      ...initialProducts.filter((product) => !existingIds.has(product.id)),
    ]

    localStorage.setItem(storageKey, JSON.stringify(migratedProducts))
    localStorage.setItem(jewelryStoreKey, 'ready')
    return migratedProducts
  } catch {
    return initialProducts
  }
}

export function saveProducts(products) {
  localStorage.setItem(storageKey, JSON.stringify(products))
}