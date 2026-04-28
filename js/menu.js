document.addEventListener("DOMContentLoaded", () => {
    // Replace with your actual JSON path
    fetch('navigation.json')
        .then(response => response.json())
        .then(data => {
            renderHeader(data);
            renderBreadcrumbs(data);
        })
        .catch(err => console.error("Error loading navigation:", err));
});

function renderHeader(data) {
    const navContainer = document.querySelector('.navbar');
    if (!navContainer) return;

    // We use a template string to build the internal structure
    const navHtml = `
        <div class="logo">${data.siteName}</div>
        <ul class="nav-links">
            ${data.mainNav.map(item => `
                <li><a href="${item.link}">${item.title}</a></li>
            `).join('')}
        </ul>
    `;
    
    navContainer.innerHTML = navHtml;
}

function renderBreadcrumbs(data) {
    const breadContainer = document.querySelector('.breadcrumbs');
    if (!breadContainer) return;

    const currentPath = window.location.pathname;
    
    // Find the matching path in your JSON
    // This looks for a key in JSON that matches the end of the current URL
    const activeKey = Object.keys(data.breadcrumbs).find(key => currentPath.endsWith(key));
    const pathArray = data.breadcrumbs[activeKey] || [];

    if (pathArray.length > 0) {
        breadContainer.innerHTML = pathArray
            .map((crumb, index) => {
                const isLast = index === pathArray.length - 1;
                // You can style .breadcrumb-item in your CSS
                return isLast 
                    ? `<span class="current-page">${crumb}</span>` 
                    : `<a href="#" class="breadcrumb-link">${crumb}</a>`;
            })
            .join(' <span class="separator">/</span> ');
    }
}