// 이미지 미리보기 함수
function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const preview = document.getElementById('imagePreview');
        preview.src = reader.result;
        preview.style.display = 'block';
    }
    reader.readAsDataURL(event.target.files[0]);
}

// 게시물 관련 함수
function addPost() {
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    const imagePreview = document.getElementById('imagePreview');
    
    if (!title.trim() || !content.trim()) {
        alert('제목과 내용을 모두 입력해주세요.');
        return;
    }

    const post = {
        title: title,
        content: content,
        image: imagePreview.style.display !== 'none' ? imagePreview.src : null,
        date: new Date().toLocaleString(),
        id: Date.now()
    };

    // 기존 게시물 데이터를 가져와 새로운 게시물 추가
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.unshift(post); // 새 게시물을 맨 앞에 추가
    localStorage.setItem('posts', JSON.stringify(posts)); // 로컬 저장소에 저장

    // 게시물 목록 업데이트
    const postList = document.getElementById('postList');
    const postElement = createPostElement(post);
    postList.insertBefore(postElement, postList.firstChild);

    // 입력 필드 초기화
    document.getElementById('postTitle').value = '';
    document.getElementById('postContent').value = '';
    imagePreview.src = '';
    imagePreview.style.display = 'none';
    document.getElementById('imageInput').value = '';
}

// 게시물 HTML 요소 생성 함수
function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    
    let imageHtml = '';
    if (post.image) {
        imageHtml = `<img src="${post.image}" alt="게시물 이미지" class="post-image">`;
    }

    postDiv.innerHTML = `
        <div class="post-title">${post.title}</div>
        <div class="post-content">${post.content}</div>
        ${imageHtml}
        <div class="post-date">${post.date}</div>
    `;
    return postDiv;
}

// 댓글 관련 함수
function addComment() {
    const comment = document.getElementById('commentInput').value;
    
    if (!comment.trim()) {
        alert('댓글 내용을 입력해주세요.');
        return;
    }

    const commentList = document.getElementById('commentList');
    const commentElement = createCommentElement(comment);
    commentList.insertBefore(commentElement, commentList.firstChild);

    // 입력 필드 초기화
    document.getElementById('commentInput').value = '';
}

// 댓글 HTML 요소 생성 함수
function createCommentElement(comment) {
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    commentDiv.innerHTML = `
        <div class="comment-content">${comment}</div>
        <div class="comment-date">${new Date().toLocaleString()}</div>
    `;
    return commentDiv;
}

// 페이지 로드 시 로컬 저장소에서 데이터 불러오기
window.onload = function() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postList = document.getElementById('postList');
    
    posts.forEach(post => {
        const postElement = createPostElement(post);
        postList.appendChild(postElement);
    });
}
