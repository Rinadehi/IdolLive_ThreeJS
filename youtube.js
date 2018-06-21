// YouTubeの埋め込み
function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player(
        'player', // 埋め込む場所の指定

        {
            videoId: '5f0ax85uvfk', // YouTubeのID
            height: '180',
            width: '320',

            playerVars: {
                loop: 0,
                controls: 0,//コントローラー有り
                autoplay: 1,//オートプレイ
                showinfo: 0,//動画タイトルなど表示しない
                fs: 0,
                playsinline: 1,
            },

            events: {
                'onReady': onPlayerReady
            }
        }
    );

}
//プレイ準備完了後
function onPlayerReady(event) {
    event.target.mute();
    event.target.playVideo();
}