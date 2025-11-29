$(function() {
  let currentUserId = 1;
  const maxUsers = 30;

  loadUser(currentUserId);

  $('header button').eq(0).on('click', function() {
    currentUserId = currentUserId === 1 ? maxUsers : currentUserId - 1;
    loadUser(currentUserId);
  });

  $('header button').eq(1).on('click', function() {
    currentUserId = currentUserId === maxUsers ? 1 : currentUserId + 1;
    loadUser(currentUserId);
  });


  $(document).on('click', '.posts h3', function() {
    $('.posts ul').slideToggle();
  });

  $(document).on('click', '.todos h3', function() {
    $('.todos ul').slideToggle();
  });


  $(document).on('click', '.posts h4', function() {
    const postId = $(this).data('post-id');
    loadPost(postId);
  });


  $(document).on('click', '.overlay button', function() {
    $('.overlay').remove();
  });

  $(document).on('click', '.overlay', function(e) {
    if (e.target === this) {
      $('.overlay').remove();
    }
  });


  function loadUser(userId) {
    $.ajax({
      url: `https://dummyjson.com/users/${userId}`,
      method: 'GET',
      success: function(user) {
        displayUser(user);
        loadPosts(userId);
        loadTodos(userId);
      },
      error: function(err) {
        console.error('Error loading user:', err);
      }
    });
  }

  function displayUser(user) {
    $('.info__image img').attr('src', user.image);
    $('.info__content').html(`
      <h2>${user.firstName} ${user.lastName}</h2>
      <p><strong>Age:</strong> ${user.age}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Phone:</strong> ${user.phone}</p>
    `);
  }

  function loadPosts(userId) {
    $.ajax({
      url: `https://dummyjson.com/users/${userId}/posts`,
      method: 'GET',
      success: function(data) {
        displayPosts(data.posts);
      },
      error: function(err) {
        console.error('Error loading posts:', err);
      }
    });
  }

 
  function displayPosts(posts) {
    if (posts.length > 0) {
  
      const userName = $('.info__content h2').text().split(' ')[0];
      $('.posts h3').text(`${userName}'s Posts`);
      const postsHtml = posts.map(post => `
        <li>
          <h4 data-post-id="${post.id}">${post.title}</h4>
          <p>${post.body}</p>
        </li>
      `).join('');
      $('.posts ul').html(postsHtml);
    }
  }

  function loadTodos(userId) {
    $.ajax({
      url: `https://dummyjson.com/users/${userId}/todos`,
      method: 'GET',
      success: function(data) {
        displayTodos(data.todos);
      },
      error: function(err) {
        console.error('Error loading todos:', err);
      }
    });
  }


  function displayTodos(todos) {
    if (todos.length > 0) {

      const userName = $('.info__content h2').text().split(' ')[0];
      $('.todos h3').text(`${userName}'s To Dos`);
      const todosHtml = todos.map(todo => `
        <li>${todo.todo}</li>
      `).join('');
      $('.todos ul').html(todosHtml);
    }
  }

  function loadPost(postId) {
    $.ajax({
      url: `https://dummyjson.com/posts/${postId}`,
      method: 'GET',
      success: function(post) {
        displayModal(post);
      },
      error: function(err) {
        console.error('Error loading post:', err);
      }
    });
  }
  function displayModal(post) {
    const modal = `
      <div class="overlay">
        <div class="modal">
          <h3>${post.title}</h3>
          <p>${post.body}</p>
          <p><strong>Views:</strong> ${post.views}</p>
          <button>Close Modal</button>
        </div>
      </div>
    `;
    $('body').append(modal);
  }
});