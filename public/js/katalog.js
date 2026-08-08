document.addEventListener("DOMContentLoaded", () => {

  const productList =
    document.getElementById("product-list");

  const emptyMessage =
    document.getElementById("empty-message");

  const filterForm =
    document.getElementById("filter-form");


  // Ambil produk dari REST API
  async function loadProducts() {

    try {

      const response =
        await fetch("/api/products");

      const result =
        await response.json();


      if (!response.ok) {
        throw new Error(
          result.message ||
          "Gagal mengambil data produk"
        );
      }


      renderProducts(result.data);

    } catch (error) {

      console.error(error);

      productList.innerHTML = `
        <p>
          Gagal mengambil data produk.
        </p>
      `;

    }

  }


  // Menampilkan produk ke halaman
  function renderProducts(products) {

    productList.innerHTML = "";

    if (products.length === 0) {

      emptyMessage.hidden = false;

      return;
    }

    emptyMessage.hidden = true;


    products.forEach((product) => {

      const article =
        document.createElement("article");

      article.className =
        "product-card";


      article.innerHTML = `

        <div class="product-card__content">

          <p class="eyebrow">
            ${product.kategori}
          </p>

          <h2>
            ${product.nama}
          </h2>

          <p>
            ${product.deskripsi}
          </p>

          <strong>
            Rp${product.harga.toLocaleString("id-ID")}
          </strong>

          <p>
            Stok:
            ${product.stok}
            ${product.satuan}
          </p>

          <a
            href="/produk/${product.id}"
            class="btn btn--primary"
          >
            Lihat Detail
          </a>

        </div>

      `;

      productList.appendChild(article);

    });

  }


  // Filter produk
  filterForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      const search =
        document
          .getElementById("search")
          .value
          .trim()
          .toLowerCase();


      const kategori =
        document
          .getElementById("kategori")
          .value
          .trim()
          .toLowerCase();


      try {

        const response =
          await fetch("/api/products");

        const result =
          await response.json();

        let products =
          result.data;


        // Filter search
        if (search) {

          products =
            products.filter(
              (product) =>
                product.nama
                  .toLowerCase()
                  .includes(search)
            );

        }


        // Filter kategori
        if (kategori) {

          products =
            products.filter(
              (product) =>
                product.kategori
                  .toLowerCase() ===
                kategori
            );

        }


        renderProducts(products);

      } catch (error) {

        console.error(error);

        productList.innerHTML = `
          <p>
            Gagal mengambil data produk.
          </p>
        `;

      }

    }
  );


  // Jalankan ketika halaman dibuka
  loadProducts();

});