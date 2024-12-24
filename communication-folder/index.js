// 페이지 로드 시 댓글과 대댓글 불러오기
window.onload = () => {
    loadComments();
};

// 댓글 추가 기능
function addComment() {
    const commentInput = document.getElementById("commentInput");
    if (commentInput.value.trim() !== "") {
        // 등록 확인
        if (!confirm("등록하시겠습니까?")) {
            return; // 사용자가 취소를 선택하면 함수 종료
        }

        const newComment = {
            text: commentInput.value,
            likes: 0,
            replies: [] // 대댓글을 저장할 배열
        };

        let comments = JSON.parse(localStorage.getItem("comments")) || [];
        comments.push(newComment);
        localStorage.setItem("comments", JSON.stringify(comments));

        displayComment(newComment);
        commentInput.value = ""; // 입력창 초기화
    }
}

// 게시물 추가 기능



// 댓글 목록 불러오기
function loadComments() {
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.forEach(comment => displayComment(comment));
}

// 댓글과 대댓글 표시 함수
function displayComment(comment, isReply = false, parentElement = null) {
    const commentList = isReply ? parentElement : document.getElementById("commentList");
    const newComment = document.createElement("div");
    newComment.classList.add("comment");

    newComment.innerHTML = `
        <p>${comment.text}</p>
        <button class="like-button" onclick="likeComment(this)">좋아요 <span>${comment.likes}</span></button>
        <button class="reply-button" onclick="showReplyInput(this)">답글</button>
        <button class="delete-button" onclick="deleteComment(this)">삭제</button>
        <div class="reply-section"></div>
    `;

    commentList.appendChild(newComment);

    // 대댓글이 있는 경우 표시
    if (comment.replies && comment.replies.length > 0) {
        comment.replies.forEach(reply => displayComment(reply, true, newComment.querySelector(".reply-section")));
    }
}

// 답글 입력 창 표시
function showReplyInput(button) {
    const replySection = button.parentElement.querySelector(".reply-section");

    // 이미 답글 입력창이 있는 경우 중복 생성 방지
    if (replySection.querySelector(".reply-input")) return;

    const replyInput = document.createElement("textarea");
    replyInput.classList.add("reply-input");
    replyInput.placeholder = "답글을 입력하세요...";
    
    const replyButton = document.createElement("button");
    replyButton.textContent = "답글 등록";
    replyButton.onclick = () => addReply(replyInput, button.parentElement.querySelector("p").textContent);

    replySection.appendChild(replyInput);
    replySection.appendChild(replyButton);
}

// 대댓글 추가 기능
function addReply(replyInput, parentText) {
    if (replyInput.value.trim() === "") return;

    // 등록 확인
    if (!confirm("답글을 등록하시겠습니까?")) {
        return; // 사용자가 취소를 선택하면 함수 종료
    }

    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    const parentComment = findComment(comments, parentText);

    if (parentComment) {
        const newReply = {
            text: replyInput.value,
            likes: 0,
            replies: [] // 대댓글에도 추가적인 대댓글을 허용
        };

        parentComment.replies.push(newReply);
        localStorage.setItem("comments", JSON.stringify(comments));
        displayComment(newReply, true, replyInput.parentElement);
        replyInput.value = ""; // 입력창 초기화
    }
}


// 댓글 찾기 함수 (대댓글 포함)
function findComment(comments, text) {
    for (let comment of comments) {
        if (comment.text === text) return comment;
        const foundReply = findComment(comment.replies, text);
        if (foundReply) return foundReply;
    }
    return null;
}

// 좋아요 기능
function likeComment(button) {
    const likeCount = button.querySelector("span");
    let count = parseInt(likeCount.textContent);
    likeCount.textContent = ++count;

    const commentText = button.parentElement.querySelector("p").textContent;
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    const comment = findComment(comments, commentText);
    
    if (comment) {
        comment.likes = count;
        localStorage.setItem("comments", JSON.stringify(comments));
    }
}

// 댓글 삭제 기능
function deleteComment(button) {
    const commentText = button.parentElement.querySelector("p").textContent;
    let comments = JSON.parse(localStorage.getItem("comments")) || [];

    if (confirm("댓글을 삭제하시겠습니까?")) {
        comments = deleteCommentRecursive(comments, commentText);
        localStorage.setItem("comments", JSON.stringify(comments));
        button.parentElement.remove();
    }
}

// 재귀적으로 댓글 삭제 (대댓글 포함)
function deleteCommentRecursive(comments, text) {
    return comments.filter(comment => {
        if (comment.text === text) return false;
        comment.replies = deleteCommentRecursive(comment.replies, text);
        return true;
    });
}

