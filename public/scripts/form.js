var type = '0';
var point = 0;
var key = '';
window.onload = () => {
  var searchParams = new URLSearchParams(window.location.href.split('?')[1]);
  var id = searchParams.get('id')
  var flag = searchParams.get('flag')
  type = flag;
  key = id;
  if (flag === '0') {
    tab(1)
  } else {
    tab(2)
  }
}

function cancel() {
  window.history.back()
}

function save() {
  const content = document.getElementById('comment').value;
  if (!content && content.length <= 0) {
    alert('Please input comment');
    return
  }
  var db = firebase.firestore();
  if (type === '0') {
    document.getElementById('mask').style.display = 'block';
    db.collection("movies").doc(key).get().then(doc => {
      const movie = doc.data();
      if (!movie['Comment']) {
        movie['Comment'] = []
      }
      movie['Comment'].push({
        email: window.localStorage.getItem('email'),
        star: point,
        comment: content,
        type: '0',
      })
      const comment = movie['Comment'] || [];
      let num = 0;
      let count = 0;
      if (comment.length > 1) {
        movie['Comment'].filter(el => el.type === '1').forEach(item => {
          if (item.comment.length > 10) {
            num = item.star;
            count++;
          }
        })
        movie.Rated = num / count;
      } else if (comment.length === 1) {
        movie.Rated = movie['Comment'][0].star;
      } else {
        movie.Rated = 0;
      }
      db.collection("wantto").doc(key).set(movie);
      db.collection("movies").doc(key).set(movie);
      document.getElementById('mask').style.display = 'none';
      cancel()
    })
  } else {
    document.getElementById('mask').style.display = 'block';
    db.collection("movies").doc(key).get().then(doc => {
      const movie = doc.data();
      if (!movie['Comment']) {
        movie['Comment'] = []
      }
      movie['Comment'].push({
        email: window.localStorage.getItem('email'),
        star: point,
        comment: content,
        type: '1',
      })
      const comment = movie['Comment'] || [];
      let num = 0;
      let count = 0;
      if (comment.length > 1) {
        movie['Comment'].filter(el => el.type === '1').forEach(item => {
          if (item.comment.length > 10) {
            num = item.star;
            count++;
          }
        })
        movie.Rated = num / count;
      } else if (comment.length === 1) {
        movie.Rated = movie['Comment'][0].star;
      } else {
        movie.Rated = 0;
      }
      db.collection("watched").doc(key).set(movie);
      db.collection("movies").doc(key).set(movie);
      document.getElementById('mask').style.display = 'none';
      cancel()
    })
  }
}

function clicklStar(pos) {
  document.getElementById('stars').innerHTML = '';
  let stars = ''
  for (let i = 0; i < pos; i++) {
    stars += `
      <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.17074 1.04634C7.30836 0.561827 7.99507 0.561826 8.13269 1.04634L9.49093 5.82833C9.55201 6.04335 9.74838 6.19172 9.97191 6.19172L14.4961 6.19172C14.9641 6.19172 15.1756 6.77712 14.8157 7.07624L11.0449 10.2103C10.8928 10.3367 10.8295 10.541 10.8836 10.7314L12.2959 15.7039C12.4302 16.1766 11.8733 16.5391 11.4953 16.225L7.97131 13.2961C7.78606 13.1421 7.51737 13.1421 7.33212 13.2961L3.80808 16.225C3.43013 16.5391 2.87324 16.1766 3.00752 15.7039L4.41987 10.7314C4.47393 10.541 4.41066 10.3367 4.25848 10.2103L0.487693 7.07624C0.127797 6.77712 0.339313 6.19172 0.807285 6.19172L5.33152 6.19172C5.55505 6.19172 5.75142 6.04335 5.8125 5.82833L7.17074 1.04634Z"
          fill="#F5C518" onclick="clicklStar(${i + 1})"/>
      </svg>
    `
  }
  for (let i = pos; i < 5; i++) {
    stars += `
      <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.17074 1.04634C7.30836 0.561827 7.99507 0.561826 8.13269 1.04634L9.49093 5.82833C9.55201 6.04335 9.74838 6.19172 9.97191 6.19172L14.4961 6.19172C14.9641 6.19172 15.1756 6.77712 14.8157 7.07624L11.0449 10.2103C10.8928 10.3367 10.8295 10.541 10.8836 10.7314L12.2959 15.7039C12.4302 16.1766 11.8733 16.5391 11.4953 16.225L7.97131 13.2961C7.78606 13.1421 7.51737 13.1421 7.33212 13.2961L3.80808 16.225C3.43013 16.5391 2.87324 16.1766 3.00752 15.7039L4.41987 10.7314C4.47393 10.541 4.41066 10.3367 4.25848 10.2103L0.487693 7.07624C0.127797 6.77712 0.339313 6.19172 0.807285 6.19172L5.33152 6.19172C5.55505 6.19172 5.75142 6.04335 5.8125 5.82833L7.17074 1.04634Z"
          fill="gray" onclick="clicklStar(${i + 1})"/>
      </svg>
    `
  }
  point = pos * 2;
  document.getElementById('stars').innerHTML = stars;
}

function tab(pos) {
  document.getElementById('tab-1').style.backgroundColor = '#F28446';
  document.getElementById('tab-2').style.backgroundColor = '#F28446';
  document.getElementById(`tab-${pos}`).style.backgroundColor = 'red';
}
