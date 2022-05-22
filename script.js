window.onload = () => {
  
  const profileContainer = document.querySelector('.profile-container');
  const input = document.querySelector('#search-input');
  const button = document.querySelector('#search-button');
  button.addEventListener('click', async function() {
    const inputValue = input.value;
    const data = await getData(inputValue);
    profileContainer.innerHTML = (data.message) ? showError(data.message) : updateProfile(data);
  });
  
  async function getData(value) {
    const data = await fetch('https://api.github.com/users/' + value, {
      headers: {
        Accept: "application/json"
      }
    });
    return await data.json();
  }
  
  function updateProfile(data) {
    return `
    <div class="card">
        <div class="card-body">
          <div class="wrapper">
            <div class="col-md-4">
              <div class="d-flex justify-content-center align-items-center">
                <img src="${data.avatar_url}" alt="image" class="img-fluid rounded mb-2">
              </div>
              <a href="https://github.com/${data.login}" class="btn btn-primary w-100 fw-bold mb-3">
                Visit Profile
                <i class="fa-solid fa-arrow-right mx-1"></i>
              </a>
            </div>
            <div class="col-md-7">
              <div class="d-flex align-items-center flex-wrap">
                <span class="badge bg-dark p-2">public repo : ${data.public_repos}</span>
                <span class="badge bg-green text-white p-2 mx-1">followers : ${data.followers}</span>
                <span class="badge bg-primary text-white p-2">following : ${data.following}</span>
              </div>
              <ul class="list-group my-3">
                <li class="list-group-item">
                  <span class="fw-bold">Username : </span>
                  <span>${data.name}</span>
                </li>
                <li class="list-group-item">
                  <span class="fw-bold">Company : </span>
                  <span class="badge bg-primary p-2">${checkData(data.company)}</span>
                </li>
                <li class="list-group-item">
                  <span class="fw-bold">Email : </span>
                  <span class="badge bg-primary p-2">${checkData(data.email)}</span>
                </li>
                <li class="list-group-item">
                  <span class="fw-bold">Website/Blog : </span>
                  <span class="badge bg-primary p-2">${checkData(data.blog)}</span>
                </li>
                <li class="list-group-item">
                  <span class="fw-bold">Location : </span>
                  <span>${checkData(data.location)}</span>
                </li>
                <li class="list-group-item">
                  <span class="fw-bold">Bio : </span>
                  <span>${checkData(data.bio)}</span>
                </li>
                <li class="list-group-item">
                  <span class="fw-bold">Hireable : </span>
                  <span class="badge ${(data.hireable) ? 'bg-primary' : 'bg-danger'} p-2">${(data.hireable) ? 'yes' : 'no'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  function checkData(target) {
    return (target == null) ? 'no detailed information' : target;
  }
  
  function showError(message) {
    return `
    <div class="row">
      <div class="col-md-9 mx-auto">
        <div class="bg-danger p-3 rounded">
          <span class="text-white fw-light">${message}</span>
        </div>
      </div>
    </div>
    `;
  }
  
}