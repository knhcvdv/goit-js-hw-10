const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

function hideLoader() {
  loader.style.display = 'none';
}

function showLoader() {
  loader.style.display = 'block';
}

function showCatInfo() {
  catInfo.style.display = 'flex';
}

function hideCatInfo() {
  catInfo.style.display = 'none';
}
export { hideCatInfo, hideLoader, showCatInfo, showLoader };