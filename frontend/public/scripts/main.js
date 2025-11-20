import { handleCreateUser, handleSigninUser, handleUserLogout, handleUserChange, handleUserpassChangebtn } from "./userHandle.js";
import { handleAddTaskbtn, handlecloseModalbtn, handleAddTaskForm, handleclosedesbtn } from "./taskHandle.js";
import { loadAndRenderTasks } from "./taskTable.js";

document.addEventListener("DOMContentLoaded", () => {
    console.log("App Initialized");
    
    // โหลดข้อมูลงานเมื่อเปิดเว็บ
    loadAndRenderTasks();

    // --- Authentication ---
    const signupBtn = document.getElementById("signupbtn");
    if (signupBtn) signupBtn.addEventListener("click", handleCreateUser);

    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            await handleSigninUser();
        });
    }

    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) logoutBtn.addEventListener("click", handleUserLogout);

    const changePassBtn = document.getElementById("changepass-btn");
    if (changePassBtn) changePassBtn.addEventListener("click", handleUserpassChangebtn);

    const confirmChangeBtn = document.getElementById("change-btn");
    if (confirmChangeBtn) confirmChangeBtn.addEventListener("click", handleUserChange);

    // --- Task Management ---
    const addTaskBtn = document.getElementById("add-task-btn");
    if (addTaskBtn) addTaskBtn.addEventListener("click", handleAddTaskbtn);

    const addTaskForm = document.getElementById("add-task-form");
    if (addTaskForm) {
        addTaskForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            await handleAddTaskForm();
        });
    }

    // --- Modal Controls (Close Buttons) ---
    const closeModal = document.getElementById("close-modal-btn");
    if (closeModal) closeModal.addEventListener("click", handlecloseModalbtn);

    const closeDesModal = document.getElementById("close-description-btn");
    if (closeDesModal) closeDesModal.addEventListener("click", handleclosedesbtn);

    // --- Click Outside to Close Modals (Mobile UX) ---
    window.addEventListener("click", (e) => {
        const addTaskModal = document.getElementById("add-task-modal");
        const desModal = document.getElementById("task-description-modal");

        if (e.target === addTaskModal) {
            handlecloseModalbtn();
        }
        if (e.target === desModal) {
            handleclosedesbtn();
        }
    });
});