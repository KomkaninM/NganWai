import { registerUser } from "../api/authAPI.js";
import { setUserInState } from "../main/state.js";

export function initRegisterPopup() {
  const modal = document.getElementById("register-modal");
  const openBtn = document.getElementById("open-register-btn");
  const closeBtn = document.getElementById("close-register-modal");
  const form = document.getElementById("register-form");

  openBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const studentID = document.getElementById("reg-studentID").value;
    const password = document.getElementById("reg-password").value;
    const phone = document.getElementById("reg-phone").value;
    const faculty = document.getElementById("reg-faculty").value;
    const yearValue = document.getElementById("reg-year").value;
    const year = yearValue ? parseInt(yearValue) : null;

    if (!studentID || !password || !phone || !faculty || !yearValue) {
        alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
        return;
      }
      
    const body = { studentID, password, phone, faculty, year };

    const result = await registerUser(body);

    if (result.user) {
      alert("Register successful!");
      setUserInState(result.user);
      modal.classList.add("hidden");
      form.reset();
    } else {
      alert(result.message || "Register failed");
    }
  });
}
