<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" />
  <title></title>
  <style>
    body,
    html {
      padding: 0;
      margin: 0;
    }

    .content {
      background: #eee;
      padding-top: 40px;
      padding-left: 20px;
      padding-right: 20px;
      float: left;
      width: 100%;
    }

    .a {
      color: #000;
      border-bottom: 1px solid #DADADA;
      padding-bottom: 16px;
      font-size: 20px;
    }

    .b {
      padding-top: 20px;
      color: #6A6A6A;
      font-size: 14px;
      padding-bottom: 60px;
    }

    .imgbox {
      /* width: 100%; */
      float: left;
      padding: 76px！important;
      /* display: flex; */
    }

    .imgT {
      /* width: 100%; */
      display: block;
      float: left;
      width: 100%;
    }

    .imgT1 {
      /* width: 100%; */
      display: block;
      float: left;
      width: 50%;
      height: 223px;
    }

    .imgList {
      display: flex;
      justify-content: space-around;
      width: 50%;
      float: left;
    }

    .imgS {
      width: 28%;
      height: 223px;
      /* margin: auto; */
    }

    .dad {
      text-decoration: underline;
      color: #D81F49;
    }

    .af {
      padding: 20px;
      font-size: 13px;
      width: 100%;
      float: left;
    }

    .footer {
      background: #484647;
      font-size: 12px;
      color: #fff;
      text-align: center;
      padding: 4px 0;
      width: 100%;
      float: left;
    }

    @media screen and (max-width: 720px) {
      .content {
        background: #eee;
        padding-top: 40px;
        padding-left: 20px;
        padding-right: 20px;
      }

      .a {
        color: #000;
        border-bottom: 1px solid #DADADA;
        padding-bottom: 16px;
        font-size: 20px;
      }

      .b {
        padding-top: 20px;
        color: #6A6A6A;
        font-size: 14px;
        padding-bottom: 60px;
      }

      .imgT {
        width: 100%;
        display: block;
      }

      .imgT1 {
        width: 100%;
        display: block;
      }

      .imgList {
        display: flex;
        justify-content: space-around;
      }

      .imgS {
        width: 28%;
      }

      .dad {
        text-decoration: underline;
        color: #D81F49;
      }

      .af {
        padding: 20px;
        font-size: 13px;
      }

      .footer {
        background: #484647;
        font-size: 12px;
        color: #fff;
        text-align: center;
        padding: 4px 0;
      }
    }

  </style>
</head>

<body>
  <img class="imgT" src="${bannerImg!""}" alt="">
  <div class="content">
    <div class="a">YONii會員申請完成通知</div>
    <div class="b">
      親愛的客戶您好！<br />
      歡迎您成功加入友邦人壽YONii會員，享受我們為您提供快速、方便的線上投保服務。<br />
      請您點選網路投保，找尋適合您的商品，踏上前往智能保險的便捷旅程。<br /><br />
      敬祝 闔家平安<br />
      英屬百慕達商友邦人壽保險股份有限公司台灣分公司 敬上
    </div>
  </div>
  <div class="imgbox">
    <img class="imgT1" onclick="to('${webUrl!""}')" src="${webImg!""}" alt="">
    <div class="imgList">
      <img onclick="to('')" class="imgS" src="${insureImg!""}" alt="">
      <img onclick="to('')" class="imgS" src="${insureImg!""}" alt="">
      <img class="imgS" onclick="to('${lineUrl!""}')" src="${lineImg!""}" alt="">
    </div>
  </div>
  <div class="af">
    本信件為系統自動發送請勿直接回覆，如有疑問請<span class="dad">與我聯絡</span>tw.customer@aia.com。<br /><br />
    如您要知道更多保單資訊，請隨時登入<span class="dad">保戶專區</span>進行查詢
  </div>
  <div class="footer">版權 © 2019，友邦保險控股有限公司及其附屬公司。版權所有。</div>
</body>
<script type="text/javascript">
  function to(url) {
    window.location.href = url
  }

</script>

</html>
