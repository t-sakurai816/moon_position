function getPosition() {
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

      // 日の入り
      var sunny_in = SunCalc.getTimes(new Date(), latitude, longitude);
      var tmp_sunny_in = sunny_in.sunset.getHours() + ":" + sunny_in.sunset.getMinutes();
      document.getElementById("now_sunny_in").innerHTML = tmp_sunny_in;


      // ラジアン
      var moon_position_rad = SunCalc.getMoonPosition(new Date(), latitude, longitude);
      var tmp_moon_position_rad = moon_position_rad.azimuth;
      document.getElementById("now_moon_position_rad").innerHTML = tmp_moon_position_rad;

      // 角度
      var degree = moon_position_rad.azimuth * (180 / Math.PI);
      document.getElementById("now_degree").innerHTML = degree;


      // 方角の角度
      var direction = 180 + degree;
      var direction_round = Math.round(direction);//四捨五入
      document.getElementById("now_direction").innerHTML = direction_round;


      //東西南北で
      var dname = ["北", "北北東", "北東", "東北東", "東", "東南東", "南東", "南南東", "南", "南南西", "南西", "西南西", "西", "西北西", "北西", "北北西", "北"];
      var dindex = Math.round(direction / 22.5)
      var azimuth = dname[dindex];
      document.getElementById("now_azimuth").innerHTML = azimuth;


      //月の満ち欠け(画像表示用)
      var illumination_phase = SunCalc.getMoonIllumination(new Date());
      var tmp_illumination_phase = illumination_phase.phase;
      // document.getElementById("now_illumination").innerHTML = tmp_illumination_phase;

      // 月の満ち欠け(出力用)
      var illumination_fraction = SunCalc.getMoonIllumination(new Date());
      var tmp_illumination_fraction = illumination_fraction.fraction;
      var tmp_illumination_fraction_fllor = Math.fllor(tmp_illumination_fraction * Math.pow(10, 5)) / Math.pow(10, 5);//小数点第5位
      document.getElementById("now_illumination_fraction").innerHTML = tmp_illumination_fraction_fllor;


      // 月の画像を表示 if地獄を直したい
      var img = document.getElementById("img_place");
      if (tmp_illumination_phase > 0.875 && tmp_illumination_phase < 1) {
        img.src = "./img/moon_michikake06.png";
      } else if (tmp_illumination_phase > 0.76 && tmp_illumination_phase < 0.875) {
        img.src = "./img/moon_michikake05.png";
      }
      if (tmp_illumination_phase > 0.74 && tmp_illumination_phase < 0.76) { //下弦の月
        img.src = "./img/moon_michikake04.png";
      } else if (tmp_illumination_phase >= 0.625 && tmp_illumination_phase < 0.74) {
        img.src = "./img/moon_michikake03.png";
      } else if (tmp_illumination_phase >= 0.51 && tmp_illumination_phase < 0.625) {
        img.src = "./img/moon_michikake02.png";
      } else if (tmp_illumination_phase >= 0.49 && tmp_illumination_phase < 0.51) { //満月だったら
        img.src = "./img/moon_michikake01.png";
      } else if (tmp_illumination_phase >= 0.375 && tmp_illumination_phase < 0.49) {
        img.src = "./img/moon_michikake12.png";
      } else if (tmp_illumination_phase >= 0.26 && tmp_illumination_phase < 0.375) {
        img.src = "./img/moon_michikake11.png";
      } else if (tmp_illumination_phase >= 0.24 && tmp_illumination_phase < 0.26) { //上限の月
        img.src = "./img/moon_michikake10.png";
      } else if (tmp_illumination_phase >= 0.16 && tmp_illumination_phase < 0.24) {
        img.src = "./img/moon_michikake09.png";
      } else if (tmp_illumination_phase >= 0.08 && tmp_illumination_phase < 0.16) {
        img.src = "./img/moon_michikake08.png";
      } else if (tmp_illumination_phase >= 0 && tmp_illumination_phase < 0.08) { //新月
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
