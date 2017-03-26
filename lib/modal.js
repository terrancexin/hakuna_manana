class Modal {
  displayModal() {
    const modal = document.getElementById('myModal');
    const btn = document.getElementById("myBtn");
    btn.onclick = function() {
      modal.style.display = "block";
    };

  }

  closeModal() {
    const modal = document.getElementById('myModal');
    const span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
      modal.style.display = "none";
    };

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }

}

module.exports = Modal;
