function anyPosition() {
  // 現在地を取得
  navigator.geolocation.getCurrentPosition(
    // 取得成功した場合
    function(position) {

      //緯度を取得
      var latitude = position.coords.latitude;
      document.getElementById("now_latiude").innerHTML = latitude;

      // 経度を取得
      var longitude = position.coords.longitude;
      document.getElementById("now_longitude").innerHTML = longitude;

      // 日付を取得
      var userDate = document.dateTimeForm.dateInput.value;
      document.getElementById("span1").textContent = userDate;

      //時間を取得
      var userTime = document.dateTimeForm.timeInput.value;
      document.getElementById("span2").textContent = userTime;

      //ユーザーが入力した日付と時間を代入 Date関数で使えるようにする。
      var userSelect = userDate + " " + userTime;

      // リプレイスしないとスマホでNaNになる
      //日の入り
      var sunny_in = SunCalc.getTimes(new Date(userSelect.replace(/-/g,"/")), latitude, longitude);
      var tmp_sunny_in = sunny_in.sunset.getHours() + ":" + sunny_in.sunset.getMinutes();
      document.getElementById("now_sunny_in").innerHTML = tmp_sunny_in;


      // ラジアン
      var moon_position_rad = SunCalc.getMoonPosition(new Date(userSelect.replace(/-/g,"/")), latitude, longitude);
      var tmp_moon_position_rad = moon_position_rad.azimuth;
      document.getElementById("now_moon_position_rad").innerHTML = tmp_moon_position_rad;

      // 角度
      var degree = moon_position_rad.azimuth * (180 / Math.PI);
      document.getElementById("now_degree").innerHTML = degree;

      // 方角
      var direction = 180 + degree;
      document.getElementById("now_direction").innerHTML = direction;

      //月の満ち欠け
      var illumination = SunCalc.getMoonIllumination(new Date(userSelect.replace(/-/g,"/")))
      var tmp_illumination = illumination.phase;
      // var tmp_illumination = 0.241;
      document.getElementById("now_illumination").innerHTML = tmp_illumination;


      // 月の画像を表示 if地獄を直したい
      var img = document.getElementById("img_place");
      if (tmp_illumination > 0.875 && tmp_illumination < 1) {
        img.src = "./img/moon_michikake06.png";
      } else if (tmp_illumination > 0.76 && tmp_illumination < 0.875) {
        img.src = "./img/moon_michikake05.png";
      }
      if (tmp_illumination > 0.74 && tmp_illumination < 0.76) { //下弦の月
        img.src = "./img/moon_michikake04.png";
      } else if (tmp_illumination >= 0.625 && tmp_illumination < 0.74) {
        img.src = "./img/moon_michikake03.png";
      } else if (tmp_illumination >= 0.51 && tmp_illumination < 0.625) {
        img.src = "./img/moon_michikake02.png";
      } else if (tmp_illumination >= 0.49 && tmp_illumination < 0.51) { //満月だったら
        img.src = "./img/moon_michikake01.png";
      } else if (tmp_illumination >= 0.375 && tmp_illumination < 0.49) {
        img.src = "./img/moon_michikake12.png";
      } else if (tmp_illumination >= 0.26 && tmp_illumination < 0.375) {
        img.src = "./img/moon_michikake11.png";
      } else if (tmp_illumination >= 0.24 && tmp_illumination < 0.26) { //上限の月
        img.src = "./img/moon_michikake10.png";
      } else if (tmp_illumination >= 0.16 && tmp_illumination < 0.24) {
        img.src = "./img/moon_michikake09.png";
      } else if (tmp_illumination >= 0.08 && tmp_illumination < 0.16) {
        img.src = "./img/moon_michikake08.png";
      } else if (tmp_illumination >= 0 && tmp_illumination < 0.08) { //新月
        img.src = "./img/moon_michikake07.png";
      }

    },
    // 取得失敗した場合
    function(error) {
      switch (error.code) {
        case 1: //PERMISSION_DENIED
          alert("位置情報の利用が許可されていません");
          break;
        case 2: //POSITION_UNAVAILABLE
          alert("現在位置が取得できませんでした");
          break;
        case 3: //TIMEOUT
          alert("タイムアウトになりました");
          break;
        default:
          alert("その他のエラー(エラーコード:" + error.code + ")");
          break;
      }
    }
  );
}
