/* =========================================
   DIRMAN CALCULATOR
   GAME ENGINE — NEW VERSION
   PART 1
========================================= */


/* =========================================
   GAME STATE
========================================= */

const GAME = {

  started: false,
  finished: false,

  startTime: null,
  elapsedSeconds: 0,
  timerInterval: null,

  players: {

    1: {
      score: 0,
      story: []
    },

    2: {
      score: 0,
      story: []
    }

  }

};


/* =========================================
   MAIN ELEMENTS
========================================= */

const matchTimer =
  document.getElementById(
    "matchTimer"
  );

const startGameBtn =
  document.getElementById(
    "startGameBtn"
  );

const finishGameBtn =
  document.getElementById(
    "finishGameBtn"
  );


/* =========================================
   CREATE NOTIFICATION SYSTEM
   DIBUAT LANGSUNG DARI JAVASCRIPT
   INDEX.HTML TIDAK PERLU DIUBAH
========================================= */

function createNotificationSystem() {


  /* =========================================
     CREATE STYLE
  ========================================= */

  const style =
    document.createElement(
      "style"
    );


  style.textContent = `


    /* =====================================
       TOAST
    ===================================== */

    .dirman-toast {

      position: fixed;

      left: 50%;
      bottom: 28px;

      z-index: 99999;

      width:
        calc(100% - 40px);

      max-width: 420px;

      display: flex;

      align-items: center;

      gap: 12px;

      padding:
        14px
        16px;

      background:
        rgba(
          17,
          29,
          49,
          0.97
        );

      border:
        1px solid
        rgba(
          255,
          255,
          255,
          0.08
        );

      border-radius: 17px;

      box-shadow:
        0 18px 45px
        rgba(
          0,
          0,
          0,
          0.4
        );

      backdrop-filter:
        blur(18px);

      -webkit-backdrop-filter:
        blur(18px);

      opacity: 0;

      visibility: hidden;

      transform:
        translate(
          -50%,
          25px
        );

      transition:
        opacity 0.25s ease,
        transform 0.25s ease,
        visibility 0.25s ease;

      pointer-events: none;

    }


    .dirman-toast.show {

      opacity: 1;

      visibility: visible;

      transform:
        translate(
          -50%,
          0
        );

    }


    .dirman-toast-icon {

      width: 38px;
      height: 38px;

      flex-shrink: 0;

      display: flex;

      align-items: center;
      justify-content: center;

      background:
        rgba(
          91,
          108,
          255,
          0.15
        );

      border:
        1px solid
        rgba(
          91,
          108,
          255,
          0.22
        );

      border-radius: 12px;

      color: #8f9aff;

      font-size: 17px;

      font-weight: 800;

    }


    .dirman-toast-content {

      min-width: 0;

      display: flex;

      flex-direction: column;

      gap: 3px;

    }


    .dirman-toast-content strong {

      color: #ffffff;

      font-family:
        "Plus Jakarta Sans",
        sans-serif;

      font-size: 11px;

      font-weight: 800;

    }


    .dirman-toast-content span {

      color:
        rgba(
          255,
          255,
          255,
          0.58
        );

      font-family:
        "Plus Jakarta Sans",
        sans-serif;

      font-size: 9px;

      font-weight: 500;

      line-height: 1.5;

    }



    /* =====================================
       CONFIRM MODAL
    ===================================== */

    .dirman-confirm {

      position: fixed;

      inset: 0;

      z-index: 100000;

      display: flex;

      align-items: center;

      justify-content: center;

      padding: 22px;

      background:
        rgba(
          2,
          7,
          16,
          0.72
        );

      backdrop-filter:
        blur(8px);

      -webkit-backdrop-filter:
        blur(8px);

      opacity: 0;

      visibility: hidden;

      transition:
        opacity 0.25s ease,
        visibility 0.25s ease;

    }


    .dirman-confirm.show {

      opacity: 1;

      visibility: visible;

    }


    .dirman-confirm-box {

      width: 100%;

      max-width: 390px;

      padding: 24px;

      background:
        linear-gradient(
          145deg,
          #111e33,
          #0c1728
        );

      border:
        1px solid
        rgba(
          255,
          255,
          255,
          0.08
        );

      border-radius: 25px;

      box-shadow:
        0 30px 80px
        rgba(
          0,
          0,
          0,
          0.5
        );

      transform:
        scale(0.92);

      transition:
        transform
        0.25s ease;

    }


    .dirman-confirm.show
    .dirman-confirm-box {

      transform:
        scale(1);

    }


    .dirman-confirm-icon {

      width: 48px;
      height: 48px;

      display: flex;

      align-items: center;
      justify-content: center;

      margin-bottom: 18px;

      background:
        linear-gradient(
          135deg,
          rgba(
            91,
            108,
            255,
            0.2
          ),
          rgba(
            116,
            79,
            255,
            0.12
          )
        );

      border:
        1px solid
        rgba(
          117,
          130,
          255,
          0.2
        );

      border-radius: 15px;

      color: #9ca5ff;

      font-size: 20px;

      font-weight: 800;

    }


    .dirman-confirm-box h3 {

      margin: 0;

      color: #ffffff;

      font-family:
        "Plus Jakarta Sans",
        sans-serif;

      font-size: 19px;

      font-weight: 800;

      letter-spacing:
        -0.4px;

    }


    .dirman-confirm-box p {

      margin:
        8px
        0
        22px;

      color:
        rgba(
          255,
          255,
          255,
          0.55
        );

      font-family:
        "Plus Jakarta Sans",
        sans-serif;

      font-size: 10px;

      font-weight: 500;

      line-height: 1.6;

    }


    .dirman-confirm-actions {

      display: grid;

      grid-template-columns:
        1fr
        1.35fr;

      gap: 9px;

    }


    .dirman-confirm-actions
    button {

      min-height: 48px;

      border: none;

      border-radius: 14px;

      font-family:
        "Plus Jakarta Sans",
        sans-serif;

      font-size: 11px;

      font-weight: 800;

      cursor: pointer;

    }


    .dirman-confirm-cancel {

      background:
        rgba(
          255,
          255,
          255,
          0.06
        );

      color:
        rgba(
          255,
          255,
          255,
          0.7
        );

      border:
        1px solid
        rgba(
          255,
          255,
          255,
          0.06
        )
        !important;

    }


    .dirman-confirm-ok {

      background:
        linear-gradient(
          135deg,
          #5368ff,
          #7252ff
        );

      color: #ffffff;

      box-shadow:
        0 10px 25px
        rgba(
          91,
          108,
          255,
          0.22
        );

    }


    .dirman-confirm-actions
    button:active {

      transform:
        scale(0.97);

    }


  `;


  document.head.appendChild(
    style
  );



  /* =========================================
     CREATE TOAST
  ========================================= */

  const toast =
    document.createElement(
      "div"
    );


  toast.id =
    "dirmanToast";


  toast.className =
    "dirman-toast";


  toast.innerHTML = `

    <div
      class="dirman-toast-icon"
    >
      !
    </div>

    <div
      class="dirman-toast-content"
    >

      <strong
        id="dirmanToastTitle"
      >
        Perhatian
      </strong>

      <span
        id="dirmanToastMessage"
      >
      </span>

    </div>

  `;


  document.body.appendChild(
    toast
  );



  /* =========================================
     CREATE CONFIRM MODAL
  ========================================= */

  const confirmModal =
    document.createElement(
      "div"
    );


  confirmModal.id =
    "dirmanConfirm";


  confirmModal.className =
    "dirman-confirm";


  confirmModal.innerHTML = `

    <div
      class="dirman-confirm-box"
    >

      <div
        class="dirman-confirm-icon"
      >
        ✓
      </div>

      <h3
        id="dirmanConfirmTitle"
      >
        Selesaikan Game?
      </h3>

      <p
        id="dirmanConfirmMessage"
      >
        Pertandingan akan dihentikan.
      </p>


      <div
        class="dirman-confirm-actions"
      >

        <button
          id="dirmanConfirmCancel"
          class="dirman-confirm-cancel"
          type="button"
        >
          Batal
        </button>


        <button
          id="dirmanConfirmOk"
          class="dirman-confirm-ok"
          type="button"
        >
          Selesai
        </button>

      </div>

    </div>

  `;


  document.body.appendChild(
    confirmModal
  );

}


/* =========================================
   INITIALIZE NOTIFICATION
========================================= */

createNotificationSystem();


/* =========================================
   NOTIFICATION ELEMENTS
========================================= */

const dirmanToast =
  document.getElementById(
    "dirmanToast"
  );

const dirmanToastTitle =
  document.getElementById(
    "dirmanToastTitle"
  );

const dirmanToastMessage =
  document.getElementById(
    "dirmanToastMessage"
  );


const dirmanConfirm =
  document.getElementById(
    "dirmanConfirm"
  );

const dirmanConfirmTitle =
  document.getElementById(
    "dirmanConfirmTitle"
  );

const dirmanConfirmMessage =
  document.getElementById(
    "dirmanConfirmMessage"
  );

const dirmanConfirmCancel =
  document.getElementById(
    "dirmanConfirmCancel"
  );

const dirmanConfirmOk =
  document.getElementById(
    "dirmanConfirmOk"
  );


/* =========================================
   TOAST TIMER
========================================= */

let toastTimer = null;


/* =========================================
   SHOW TOAST
========================================= */

function showToast(
  message,
  title = "Perhatian"
) {

  dirmanToastTitle.textContent =
    title;

  dirmanToastMessage.textContent =
    message;


  dirmanToast.classList.add(
    "show"
  );


  clearTimeout(
    toastTimer
  );


  toastTimer =
    setTimeout(() => {

      dirmanToast.classList.remove(
        "show"
      );

    }, 2500);

}


/* =========================================
   CUSTOM CONFIRM SYSTEM
========================================= */

let confirmCallback = null;


function showConfirm(
  title,
  message,
  callback
) {

  dirmanConfirmTitle.textContent =
    title;

  dirmanConfirmMessage.textContent =
    message;

  confirmCallback =
    callback;


  dirmanConfirm.classList.add(
    "show"
  );

}


/* =========================================
   CANCEL CONFIRM
========================================= */

dirmanConfirmCancel
  .addEventListener(
    "click",
    function () {

      dirmanConfirm.classList.remove(
        "show"
      );

      confirmCallback =
        null;

    }
  );


/* =========================================
   ACCEPT CONFIRM
========================================= */

dirmanConfirmOk
  .addEventListener(
    "click",
    function () {

      dirmanConfirm.classList.remove(
        "show"
      );


      if (
        typeof confirmCallback
        ===
        "function"
      ) {

        const callback =
          confirmCallback;


        confirmCallback =
          null;


        callback();

      }

    }
  );


/* =========================================
   FORMAT TIME
========================================= */

function formatTime(seconds) {

  const hours =
    Math.floor(
      seconds / 3600
    );

  const minutes =
    Math.floor(
      (seconds % 3600) / 60
    );

  const secs =
    seconds % 60;


  return (
    String(hours)
      .padStart(2, "0")
    +
    ":"
    +
    String(minutes)
      .padStart(2, "0")
    +
    ":"
    +
    String(secs)
      .padStart(2, "0")
  );

}


/* =========================================
   START GAME
========================================= */

function startGame() {

  if (GAME.started) {
    return;
  }


  GAME.started =
    true;

  GAME.finished =
    false;

  GAME.startTime =
    Date.now();


  startGameBtn.textContent =
    "Game Berjalan";


  startGameBtn.disabled =
    true;


  startGameBtn.style.opacity =
    "0.6";


  GAME.timerInterval =
    setInterval(
      () => {

        GAME.elapsedSeconds =
          Math.floor(
            (
              Date.now()
              -
              GAME.startTime
            )
            /
            1000
          );


        matchTimer.textContent =
          formatTime(
            GAME.elapsedSeconds
          );

      },
      1000
    );

}

/* =========================================
   DIRMAN CALCULATOR
   GAME ENGINE — NEW VERSION
   PART 2
========================================= */


/* =========================================
   SCORE BUTTON EVENTS
========================================= */

document
  .querySelectorAll(".score-btn")
  .forEach(button => {

    button.addEventListener(
      "click",
      function () {

        const playerNumber =
          Number(
            this.dataset.player
          );


        const action =
          this.dataset.action;


        updateScore(
          playerNumber,
          action
        );

      }
    );

  });


/* =========================================
   UPDATE SCORE
========================================= */

function updateScore(
  playerNumber,
  action
) {


  /* =========================================
     GAME BELUM DIMULAI
  ========================================= */

  if (!GAME.started) {

    showToast(
      "Mulai game terlebih dahulu."
    );

    return;

  }


  /* =========================================
     GAME SUDAH SELESAI
  ========================================= */

  if (GAME.finished) {

    showToast(
      "Game sudah selesai."
    );

    return;

  }


  /* =========================================
     GET INPUT
  ========================================= */

  const input =
    document.getElementById(
      `player${playerNumber}Input`
    );


  const value =
    Math.abs(
      Number(
        input.value
      )
    );


  /* =========================================
     VALIDATE INPUT
  ========================================= */

  if (
    !value
    ||
    value <= 0
  ) {

    showToast(
      "Masukkan nilai terlebih dahulu."
    );

    input.focus();

    return;

  }


  /* =========================================
     PLUS SCORE
  ========================================= */

  if (
    action === "plus"
  ) {

    GAME.players[
      playerNumber
    ].score += value;

  }


  /* =========================================
     MINUS SCORE
  ========================================= */

  if (
    action === "minus"
  ) {

    GAME.players[
      playerNumber
    ].score -= value;

  }


  /* =========================================
     SAVE STORY
  ========================================= */

  GAME.players[
    playerNumber
  ].story.push({

    id:
      Date.now(),

    action:
      action,

    value:
      value,

    totalScore:
      GAME.players[
        playerNumber
      ].score,

    time:
      GAME.elapsedSeconds

  });


  /* =========================================
     UPDATE SCORE DISPLAY
  ========================================= */

  updateScoreDisplay(
    playerNumber
  );


  /* =========================================
     UPDATE STORY
  ========================================= */

  renderPlayerStory(
    playerNumber
  );


  /* =========================================
     CLEAR INPUT
  ========================================= */

  input.value =
    "";


  /* =========================================
     FOCUS KEMBALI KE INPUT
  ========================================= */

  input.focus();

}


/* =========================================
   UPDATE SCORE DISPLAY
========================================= */

function updateScoreDisplay(
  playerNumber
) {

  const scoreElement =
    document.getElementById(
      `player${playerNumber}Score`
    );


  scoreElement.textContent =
    GAME.players[
      playerNumber
    ].score;

}


/* =========================================
   RENDER PLAYER STORY
========================================= */

function renderPlayerStory(
  playerNumber
) {

  const story =
    GAME.players[
      playerNumber
    ].story;


  const storyList =
    document.getElementById(
      `player${playerNumber}StoryList`
    );


  const emptyStory =
    document.getElementById(
      `player${playerNumber}EmptyStory`
    );


  const storyCount =
    document.getElementById(
      `player${playerNumber}StoryCount`
    );


  /* =========================================
     UPDATE STORY COUNT
  ========================================= */

  storyCount.textContent =
    story.length;


  /* =========================================
     EMPTY STORY
  ========================================= */

  if (
    story.length === 0
  ) {

    emptyStory.style.display =
      "flex";


    storyList.innerHTML =
      "";


    return;

  }


  /* =========================================
     HIDE EMPTY STATE
  ========================================= */

  emptyStory.style.display =
    "none";


  storyList.innerHTML =
    "";


  /* =========================================
     COPY & REVERSE STORY
     DATA TERBARU DI ATAS
  ========================================= */

  const reversedStory =
    [...story]
      .reverse();


  /* =========================================
     CREATE STORY ITEMS
  ========================================= */

  reversedStory.forEach(
    item => {


      const storyItem =
        document.createElement(
          "div"
        );


      storyItem.className =
        "story-item";


      /* PLUS / MINUS SYMBOL */

      const symbol =
        item.action === "plus"
          ? "+"
          : "−";


      /* =====================================
         STORY HTML
      ===================================== */

      storyItem.innerHTML = `

        <div
          class="
            story-icon
            ${item.action}
          "
        >

          ${symbol}

        </div>


        <div
          class="story-content"
        >

          <strong>

            ${symbol}${item.value}

          </strong>


          <span>

            ${formatTime(
              item.time
            )}

          </span>

        </div>


        <div
          class="
            story-value
            ${item.action}
          "
        >

          ${item.totalScore}

        </div>

      `;


      storyList.appendChild(
        storyItem
      );

    }
  );

}


/* =========================================
   PLAYER NAME → STORY NAME
========================================= */

function syncPlayerName(
  playerNumber
) {

  const nameInput =
    document.getElementById(
      `player${playerNumber}Name`
    );


  const storyName =
    document.getElementById(
      `player${playerNumber}StoryName`
    );


  const name =
    nameInput.value.trim();


  /* =========================================
     JIKA ADA NAMA
  ========================================= */

  if (name) {

    storyName.textContent =
      name;

  }


  /* =========================================
     JIKA NAMA KOSONG
  ========================================= */

  else {

    storyName.textContent =
      `Pemain ${playerNumber}`;

  }

}


/* =========================================
   PLAYER 1 NAME EVENT
========================================= */

document
  .getElementById(
    "player1Name"
  )
  .addEventListener(
    "input",
    function () {

      syncPlayerName(
        1
      );

    }
  );


/* =========================================
   PLAYER 2 NAME EVENT
========================================= */

document
  .getElementById(
    "player2Name"
  )
  .addEventListener(
    "input",
    function () {

      syncPlayerName(
        2
      );

    }
  );


/* =========================================
   ENTER KEY SUPPORT
========================================= */

document
  .getElementById(
    "player1Input"
  )
  .addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Enter"
      ) {

        updateScore(
          1,
          "plus"
        );

      }

    }
  );


document
  .getElementById(
    "player2Input"
  )
  .addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Enter"
      ) {

        updateScore(
          2,
          "plus"
        );

      }

    }
  );
  
  /* =========================================
   DIRMAN CALCULATOR
   GAME ENGINE — NEW VERSION
   PART 3
========================================= */


/* =========================================
   FINISH GAME
========================================= */

function finishGame() {


  /* =========================================
     GAME BELUM DIMULAI
  ========================================= */

  if (!GAME.started) {

    showToast(
      "Belum ada pertandingan yang berjalan."
    );

    return;

  }


  /* =========================================
     GAME SUDAH SELESAI
  ========================================= */

  if (GAME.finished) {

    showToast(
      "Pertandingan sudah selesai."
    );

    return;

  }


  /* =========================================
     SHOW CUSTOM CONFIRM
  ========================================= */

  showConfirm(

    "Selesaikan Game?",

    "Pertandingan akan dihentikan dan seluruh data permainan akan disimpan untuk riset.",

    function () {

      completeGame();

    }

  );

}


/* =========================================
   COMPLETE GAME
========================================= */

function completeGame() {


  /* =========================================
     SET GAME FINISHED
  ========================================= */

  GAME.finished =
    true;


  /* =========================================
     STOP TIMER
  ========================================= */

  clearInterval(
    GAME.timerInterval
  );


  GAME.timerInterval =
    null;


  /* =========================================
     FINAL TIMER DISPLAY
  ========================================= */

  matchTimer.textContent =
    formatTime(
      GAME.elapsedSeconds
    );


  /* =========================================
     UPDATE START BUTTON
  ========================================= */

  startGameBtn.textContent =
    "Game Selesai";


  startGameBtn.disabled =
    true;


  startGameBtn.style.opacity =
    "0.5";


  /* =========================================
     UPDATE FINISH BUTTON
  ========================================= */

  finishGameBtn.textContent =
    "Game Selesai";


  finishGameBtn.disabled =
    true;


  finishGameBtn.style.opacity =
    "0.6";


  /* =========================================
     DISABLE SCORE BUTTONS
  ========================================= */

  document
    .querySelectorAll(
      ".score-btn"
    )
    .forEach(
      button => {

        button.disabled =
          true;


        button.style.opacity =
          "0.4";

      }
    );


  /* =========================================
     DISABLE SCORE INPUTS
  ========================================= */

  document
    .querySelectorAll(
      ".score-input"
    )
    .forEach(
      input => {

        input.disabled =
          true;

      }
    );


  /* =========================================
     CREATE RESEARCH DATA
  ========================================= */

  const researchData =
    researchGame();


  /* =========================================
     SAVE LAST GAME
     UNTUK RISET INTERNAL
  ========================================= */

  try {

    localStorage.setItem(

      "DIRMAN_LAST_GAME",

      JSON.stringify(
        researchData
      )

    );

  }

  catch (error) {

    console.log(
      "Data game tidak dapat disimpan:",
      error
    );

  }


  /* =========================================
     SUCCESS TOAST
  ========================================= */

  showToast(

    "Pertandingan selesai. Seluruh Match Story berhasil disimpan.",

    "Game Selesai"

  );

}


/* =========================================
   RESEARCH GAME
========================================= */

function researchGame() {


  /* =========================================
     PLAYER NAMES
  ========================================= */

  const player1Name =
    document
      .getElementById(
        "player1Name"
      )
      .value
      .trim()
    ||
    "Pemain 1";


  const player2Name =
    document
      .getElementById(
        "player2Name"
      )
      .value
      .trim()
    ||
    "Pemain 2";


  /* =========================================
     PLAYER 1 DATA
  ========================================= */

  const player1Story =
    GAME.players[1]
      .story;


  const player1Plus =
    player1Story.filter(
      item =>
        item.action === "plus"
    );


  const player1Minus =
    player1Story.filter(
      item =>
        item.action === "minus"
    );


  /* =========================================
     PLAYER 2 DATA
  ========================================= */

  const player2Story =
    GAME.players[2]
      .story;


  const player2Plus =
    player2Story.filter(
      item =>
        item.action === "plus"
    );


  const player2Minus =
    player2Story.filter(
      item =>
        item.action === "minus"
    );


  /* =========================================
     BUILD RESEARCH DATA
  ========================================= */

  const researchData = {

    finishedAt:
      new Date()
        .toISOString(),


    duration:
      GAME.elapsedSeconds,


    durationFormatted:
      formatTime(
        GAME.elapsedSeconds
      ),


    player1: {

      name:
        player1Name,


      finalScore:
        GAME.players[1]
          .score,


      totalActivity:
        player1Story.length,


      plusCount:
        player1Plus.length,


      minusCount:
        player1Minus.length,


      plusTotal:
        player1Plus.reduce(

          (
            total,
            item
          ) =>

            total
            +
            item.value,

          0

        ),


      minusTotal:
        player1Minus.reduce(

          (
            total,
            item
          ) =>

            total
            +
            item.value,

          0

        ),


      story:
        player1Story

    },


    player2: {

      name:
        player2Name,


      finalScore:
        GAME.players[2]
          .score,


      totalActivity:
        player2Story.length,


      plusCount:
        player2Plus.length,


      minusCount:
        player2Minus.length,


      plusTotal:
        player2Plus.reduce(

          (
            total,
            item
          ) =>

            total
            +
            item.value,

          0

        ),


      minusTotal:
        player2Minus.reduce(

          (
            total,
            item
          ) =>

            total
            +
            item.value,

          0

        ),


      story:
        player2Story

    }

  };


  /* =========================================
     CONSOLE RESEARCH
  ========================================= */

  console.log(
    "HASIL RISET GAME:",
    researchData
  );


  return researchData;

}


/* =========================================
   BUTTON EVENTS
========================================= */

startGameBtn
  .addEventListener(
    "click",
    startGame
  );


finishGameBtn
  .addEventListener(
    "click",
    finishGame
  );


/* =========================================
   INITIAL RENDER
========================================= */

syncPlayerName(
  1
);


syncPlayerName(
  2
);


updateScoreDisplay(
  1
);


updateScoreDisplay(
  2
);


renderPlayerStory(
  1
);


renderPlayerStory(
  2
);


/* =========================================
   PWA SERVICE WORKER
========================================= */

if (
  "serviceWorker"
  in
  navigator
) {

  window.addEventListener(

    "load",

    function () {

      navigator
        .serviceWorker
        .register(
          "./service-worker.js"
        )

        .then(
          function (
            registration
          ) {

            console.log(
              "Dirman Calculator PWA aktif",
              registration.scope
            );

          }
        )

        .catch(
          function (
            error
          ) {

            console.log(
              "Service Worker gagal:",
              error
            );

          }
        );

    }

  );

}