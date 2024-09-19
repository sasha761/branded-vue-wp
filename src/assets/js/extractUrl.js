function extractProductName(url) {
  const urlObj = new URL(url);
  const pathnameParts = urlObj.pathname.split('/').filter(part => part.length > 0);

  // Предполагаем, что product slug находится после '/product/'
  const productIndex = pathnameParts.indexOf('product') + 1;

  return productIndex > 0 && productIndex < pathnameParts.length ? pathnameParts[productIndex] : null;
}

function extractDomainName(url) {
  const urlObj = new URL(url);
  return urlObj.pathname + urlObj.search + urlObj.hash;
}

export {extractProductName, extractDomainName}