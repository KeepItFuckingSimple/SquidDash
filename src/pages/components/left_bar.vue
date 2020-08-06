<template>
    <div class="left_bar">
        <div class="icon-container active">
            <ion-icon class="" name="home-outline"></ion-icon>

        </div>
        <div class="icon-container">
            <ion-icon name="desktop-outline"></ion-icon>

        </div>
        <div class="icon-container">
           <ion-icon name="cafe-outline"></ion-icon>

        </div>

    </div>
</template>

<script>
export default {
    name: "Sidebar"
}
</script>

<style lang="scss">

@-webkit-keyframes slide-down {
      0% { opacity: 0; -webkit-transform: translateX(-100%); }   
    100% { opacity: 1; -webkit-transform: translateX(0); }
}
@-moz-keyframes slide-down {
      0% { opacity: 0; -moz-transform: translateX(-100%); }   
    100% { opacity: 1; -moz-transform: translateX(0); }
}

.invisible{
    visibility: hidden;
    transition: visibility 0s, opacity 0.5s linear;


}
.visible{
    visibility: visible;
    -webkit-animation: slide-down .3s ease-out;
    -moz-animation: slide-down .3s ease-out;

}

.left_bar{

    padding-top: 25px;
    background: blueviolet;
    height: 100%;
    width: 115px;
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
}
.icon-container{
    color: white;
    font-size: 3rem;
    padding-bottom: 20px;
    width: 100px;
    margin-left: 7px;
    border-radius: 15px;
}

.active{
    background-color: rgba(0,0,0,0.2);

}

.icon-container ion-icon{
      padding-top: 25%;

}
</style>