const category = ["Documentary","Comedy","Drama","Romance","Western","Action","Crime","Mystery","Thriller","Biography", "History", "War", "Music", "Family", "Sport", "Animation", "Short", "Fantasy", "Adventure", "Musical", "Horror", "Sci-Fi", "Film-Noir"]

render(category)

function handleChange() {
  const keyword = document.getElementById('keyword');
  if (keyword.value && keyword.value !== '') {
    render(category.filter(el => el.indexOf(keyword.value) > -1));
  } else {
    render(category);
  }
}

function render(category) {
  document.getElementById('container').innerHTML = ''
  let result = '';
  category.forEach(item => {
    result += `
      <button onclick="handleClick('${item}')">${item}</button>
    `
  })
  document.getElementById('container').innerHTML = result;
}

function handleClick(category) {
  window.location.href = `/listed.html?category=${category}`;
}