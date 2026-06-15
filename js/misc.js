// stamp scroll track
const stamps = [
    { img: "stamp0",  label: "Santa Monica MT" },
    { img: "stamp1",  label: "Karuizawa" },
    { img: "stamp2",  label: "Oami" },
    { img: "stamp3",  label: "Santa Monica MT" },
    { img: "stamp4",  label: "Obuse" },
    { img: "stamp5",  label: "Oami" },
    { img: "stamp6",  label: "Oami" },
    { img: "stamp7",  label: "Oami" },
    { img: "stamp22", label: "Nagano" },
    { img: "stamp12", label: "Santa Monica MT" },
    { img: "stamp11", label: "Laguna Beach" },
    { img: "stamp13", label: "Santa Monica MT" },
    { img: "stamp14", label: "Santa Monica MT" },
    { img: "stamp15", label: "Collegeville" },
    { img: "stamp16", label: "Santa Monica MT" },
    { img: "stamp17", label: "Oami" },
    { img: "stamp19", label: "Joshua Tree" },
    { img: "stamp41", label: "Santa Monica MT" },
    { img: "stamp20", label: "Malibu" },
    { img: "stamp23", label: "Chiba" },
    { img: "stamp18", label: "Santa Monica MT" },
    { img: "stamp29", label: "La Jolla Cove" },
    { img: "stamp24", label: "Tokyo" },
    { img: "stamp25", label: "Joshua Tree" },
    { img: "stamp27", label: "Santa Monica MT" },
    { img: "stamp30", label: "Collegeville" },
    { img: "stamp32", label: "Death Valley" },
    { img: "stamp40", label: "Santa Monica MT" },
    { img: "stamp31", label: "Antelope Valley" },
    { img: "stamp38", label: "Santa Monica MT" },
    { img: "stamp36", label: "Red Rock Canyon" }
  ];
  
  const track = document.getElementById('misc-track');
  
  function buildSet() {
    stamps.forEach(({ img, label }) => {
      const el = document.createElement('img');
      el.src = `imgs/${img}.png`;
      el.alt = label;
      el.className = 'photo-thumb';
      el.title = label;
      track.appendChild(el);
    });
  }
  
  buildSet();
  buildSet();