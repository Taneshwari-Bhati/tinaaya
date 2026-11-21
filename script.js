
let products = [
    {
        id: 1,
        name: "Rajwada Rani Haar",
        category: "Necklace",
        price: 8500,
        image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600",
        description: "A majestic layered Kundan Rani Haar inspired by the royal queens of Rajasthan."
    },
    {
        id: 2,
        name: "Jaipur Polki Choker",
        category: "Necklace",
        price: 6200,
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600",
        description: "An elegant Polki Kundan choker with timeless royal charm."
    },
    {
        id: 3,
        name: "Rajputi Borla",
        category: "Maang Tikka",
        price: 2800,
        image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600",
        description: "A traditional Rajasthani Borla, inspired by the heritage of Rajputana."
    },
    {
        id: 4,
        name: "Meenakari Chandbali",
        category: "Earrings",
        price: 3500,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600",
        description: "Beautiful Chandbali earrings with colourful traditional Meenakari detailing."
    },
    {
        id: 5,
        name: "Rajputi Kundan Aad",
        category: "Necklace",
        price: 7500,
        image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600",
        description: "A statement Aad necklace reflecting the grandeur of Rajasthani bridal jewellery."
    },
    {
        id: 6,
        name: "Thewa Heritage Earrings",
        category: "Earrings",
        price: 2200,
        image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600",
        description: "Inspired by the traditional glasswork and gold artistry of Pratapgarh."
    },
    {
        id: 7,
        name: "Maharani Meenakari Kadas",
        category: "Bangles",
        price: 4200,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600",
        description: "Traditional statement Kadas featuring colourful royal-inspired detailing."
    },
    {
        id: 8,
        name: "Gulabi Polki Hathphool",
        category: "Bangles",
        price: 3100,
        image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600",
        description: "A graceful Hathphool inspired by the traditional adornments of Rajasthani brides."
    },
    {
        id: 9,
        name: "Sheesh Mahal Mathapatti",
        category: "Maang Tikka",
        price: 3900,
        image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600",
        description: "An elaborate Mathapatti inspired by the magnificent palaces of Rajasthan."
    }
];

let wishlist = [];
let bag = [];

function displayProducts(list) {
    let container = document.getElementById("productList");

    if (!container) return;

    container.innerHTML = "";

    if (list.length === 0) {
        container.innerHTML = "<p>No matching royal pieces found.</p>";
        return;
    }

    list.forEach(function(product) {
        container.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" class="product-image" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.category}</p>
                    <p>₹${product.price.toLocaleString("en-IN")}</p>
                    <p>${product.description}</p>
                    <div class="product-actions">
                        <button onclick="addToBag(${product.id})">Add to Bag</button>
                        <button onclick="addToWishlist(${product.id})">♡ Wishlist</button>
                    </div>
                </div>
            </div>
        `;
    });
}

function filterProducts() {
    let search = document.getElementById("searchBox").value.toLowerCase();
    let category = document.getElementById("categoryFilter").value;
    let sort = document.getElementById("sortFilter").value;

    let filtered = products.filter(function(product) {
        let matchesSearch = product.name.toLowerCase().includes(search);
        let matchesCategory = category === "all" || product.category === category;

        return matchesSearch && matchesCategory;
    });

    if (sort === "low") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
        filtered.sort((a, b) => b.price - a.price);
    }

    displayProducts(filtered);
}

function addToBag(id) {
    let product = products.find(item => item.id === id);

    if (product) {
        bag.push(product);
        updateBag();
        alert(product.name + " added to your bag!");
    }
}

function updateBag() {
    let container = document.getElementById("bagItems");
    let count = document.getElementById("bagCount");
    let total = document.getElementById("totalPrice");

    if (count) count.innerText = bag.length;

    if (container) {
        container.innerHTML = "";

        bag.forEach(function(item) {
            container.innerHTML += `
                <p>${item.name} - ₹${item.price.toLocaleString("en-IN")}</p>
            `;
        });
    }

    if (total) {
        let sum = bag.reduce((total, item) => total + item.price, 0);
        total.innerText = "₹" + sum.toLocaleString("en-IN");
    }
}

function addToWishlist(id) {
    let product = products.find(item => item.id === id);

    if (product && !wishlist.some(item => item.id === id)) {
        wishlist.push(product);
        updateWishlist();
        alert("Added to your wishlist!");
    }
}

function updateWishlist() {
    let container = document.getElementById("wishlistItems");

    if (!container) return;

    container.innerHTML = "";

    wishlist.forEach(function(item) {
        container.innerHTML += `
            <p>${item.name} - ₹${item.price.toLocaleString("en-IN")}</p>
        `;
    });
}

function findRoyalStyle(event) {
    event.preventDefault();

    let occasion = document.getElementById("occasion").value;
    let budget = Number(document.getElementById("styleBudget").value);
    let category = document.getElementById("styleChoice").value;

    let suggestions = products.filter(function(product) {
        return product.price <= budget &&
            (category === "all" || product.category === category);
    });

    let result = document.getElementById("styleResult");

    if (suggestions.length === 0) {
        result.innerHTML = "No royal pieces found within this budget. Try increasing your budget.";
    } else {
        result.innerHTML = "<h3>Your Royal Look for " + occasion + "</h3>";

        suggestions.forEach(function(item) {
            result.innerHTML += `
                <p>${item.name} - ₹${item.price.toLocaleString("en-IN")}</p>
            `;
        });
    }
}

document.addEventListener("DOMContentLoaded", function() {
    displayProducts(products);

    let search = document.getElementById("searchBox");
    let category = document.getElementById("categoryFilter");
    let sort = document.getElementById("sortFilter");

    if (search) search.addEventListener("input", filterProducts);
    if (category) category.addEventListener("change", filterProducts);
    if (sort) sort.addEventListener("change", filterProducts);

    let styleForm = document.getElementById("styleForm");
    if (styleForm) styleForm.addEventListener("submit", findRoyalStyle);

    let clearBag = document.getElementById("clearBag");

    if (clearBag) {
        clearBag.addEventListener("click", function() {
            bag = [];
            updateBag();
        });
    }

    let contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            alert("Thank you for contacting TINAAYA!");
            contactForm.reset();
        });
    }
});