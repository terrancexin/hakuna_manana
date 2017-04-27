class Modal {
  displayModal() {
    const modal = document.getElementById('myModal');
    const btn = document.getElementById("myBtn");
    btn.onclick = () => {
      modal.style.display = "block";
    };

  }

  closeModal() {
    const modal = document.getElementById('myModal');
    const span = document.getElementsByClassName("close")[0];
    span.onclick = () => {
      modal.style.display = "none";
    };

    window.onclick = event => {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };

    document.addEventListener("keydown", event => {
      if (event.keyCode === 13) {
        event.preventDefault();
        modal.style.display = "none";
      }
    });
  }

}

module.exports = Modal;
