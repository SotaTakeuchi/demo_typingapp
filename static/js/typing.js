document.onkeydown = typeGame; //キー押下時に関数typeGame()を呼び出す

//文字を格納する配列
var moji = ["A", "B", "C", "D", "E", "F", "G", "H", "I",
    "J", "K", "L", "M", "N", "O", "P", "Q", "R",
    "S", "T", "U", "V", "W", "X", "Y", "Z"
];
var moji_s = ["a", "b", "c", "d", "e", "f", "g", "h", "i",
    "j", "k", "l", "m", "n", "o", "p", "q", "r",
    "s", "t", "u", "v", "w", "x", "y", "z"
];
//キーコードを格納する配列
var kcode = new Array(65, 66, 67, 68, 69, 70, 71, 72, 73,
    74, 75, 76, 77, 78, 79, 80, 81, 82,
    83, 84, 85, 86, 87, 88, 89, 90);

//0～25までの乱数を格納する配列
var rnd = new Array();
//制限時間。０を含めた秒数。２なら、３秒
var limit = 4;
var sec, msec, timer;
var miss_string, success;
//スコア変数
var rest = 0;
var score = 0;
//グローバル変数群
var mondai = ""; //問題の文字列を格納
var input = ""; //打ち込み内容
var description = ""; //説明文の内容
var mondaiCount = ""; //問題の文字列を格納
var missType = 0; //入力ミスの回数
var cnt = 0; //入力数

var ans = 0; //回答数

var endFlag = false; //時間切れになったかどうか
var typStart, typEnd; //開始時と終了時の時刻を格納

dat = [{
        "c_word": "ToyoUniversity"
    },
    {
        "c_word": "INIAD"
    },
    {
        "c_word": "SakamuraKen"
    },
    {
        "c_word": "Akabane"
    },
    {
        "c_word": "ComputerScience"
    },
];



//問題の文字列をキーボード番号に対応させる。
function ransu(mondai) {
    for (var i = 0; i < mondai.length; i++) {
        //i番目の文字列を探す
        var serch = mondai.charAt(i);
        //i番目にある文字列の番号を探す。
        rnd[i] = moji.indexOf(serch);
        if (rnd[i] < 0) {
            rnd[i] = moji_s.indexOf(serch);
        }
    }
}

//タイピングゲームの問題をセットする関数
function gameSet() {
    cnt = 0;

    mondai = dat[ans]['c_word'];
    description = dat[ans]['c_description'];

    mondaiCount = mondai.length;
    //乱数作成関数の呼び出し
    ransu(mondai);

    //問題枠に表示する
    document.getElementById("mondai").innerHTML = mondai;
    document.getElementById("input").innerHTML = "<font class='test'>＞</font>";
    document.getElementById("description").innerHTML = description;
}



function timeCount() {
    //全文字入力していたら、終了時間を記録する
    typEnd = new Date();

    //終了時間－開始時間で掛かったミリ秒を取得する
    var keika = typEnd - typStart;
    //1000で割って「切捨て」、秒数を取得
    sec = limit - Math.floor(keika / 1000);

    //1000で割った「余り(%で取得できる）」でミリ秒を取得
    msec = 9 - Math.floor((keika / 100) % 10);

    //問題終了を告げる文字列を作成
    var countTime = "GAME終了まであと：" + sec + "秒" + msec;

    //現在残り時間の代入
    document.getElementById("time").innerHTML = countTime;

    //スコア計算(余った秒数を足して行く)
    rest = 4000 - keika;
    score += rest;

    //時間切れになった際の処理
    if (sec == 0 && msec == 0) {
        document.getElementById("time").innerHTML = '時間切れです。';
        document.getElementById("mondai").innerHTML = '正答数：' + ans + '/' + (dat.length) + 'スコア：' + score;
        clearTimeout(timer);
        endFlag = true;
        gameFinish();
    }
}


//キー入力を受け取る関数
//最初の一文字目が入力された時点でスタート
function typeGame(evt) {
    if (endFlag == false) {
        var kc; //入力されたキーコードを格納する変数
        //入力されたキーのキーコードを取得
        if (document.all) {
            kc = event.keyCode;
        } else {
            kc = evt.which;
        }

        //入力されたキーコードと、問題文のキーコードを比較
        if (kc == kcode[rnd[cnt]] && ans != dat.length) {
            //以下、キーコードが一致した時の処理
            //最初の1文字が入力された時間を記録する
            if (cnt == 0 && ans == 0) {
                timer = setInterval("timeCount()", 100);
                typStart = new Date();
            }

            cnt++; //カウント数を＋１にする

            //全文字入力したか確認
            if (cnt < mondaiCount) {
                //問題文の頭の一文字を切り取る
                input = mondai.substring(0, cnt);

                //問題枠に表示する
                document.getElementById("mondai").innerHTML = mondai;
                document.getElementById("input").innerHTML = "<font class='test'>＞</font>" + input;
                document.getElementById("description").innerHTML = description;
                document.getElementById("missType").innerHTML = '合計ミスタイプ：' + missType + '回';
            } else {
                if (ans == dat.length - 1) {
                    ans++;
                    //全文字入力していたら、終了時間を記録する
                    typEnd = new Date();
                    //終了時間－開始時間で掛かったミリ秒を取得する
                    var keika = typEnd - typStart;
                    //1000で割って「切捨て」、秒数を取得
                    sec = Math.floor(keika / 1000);
                    //1000で割った「余り(%で取得できる）」でミリ秒を取得
                    msec = keika % 1000;
                    //問題終了を告げる文字列を作成
                    var fin = "GAME終了　時間：" + sec + "秒" + msec;
                    //問題枠にゲーム終了を表示

                    //タイマー終了
                    clearTimeout(timer);
                    document.getElementById("mondai").innerHTML = '全問正答！スコアは' + score;
                    return gameFinish();
                } else {
                    ans++;
                    //一題解いたら時間リセット
                    typStart = new Date();
                    gameSet();
                    mondaiCount--;
                }
            }
        } else if (ans != dat.length - 1) {
            if (sec != 0 & msec != 0){
                missType++;

                document.getElementById("missType").innerHTML = '合計ミスタイプ：' + missType + '回';
            }


        }
    }
}

//キー入力を受け取る関数
function gameFinish() {
    sec = 0;
    msec = 0;
    document.getElementById("time").innerHTML = '終了';
    document.getElementById("description").innerHTML = 'お疲れ様でした。';
    document.getElementById("input").innerHTML = "<font class='endTitle'>program</font> -> end;";
    document.getElementById("missType").innerHTML = '合計ミスタイプ：' + missType + '回';
    document.getElementById("retry").style.visibility = 'visible';

}
