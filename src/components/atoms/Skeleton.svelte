<div class="tweet">
    <div class="skeleton">
       <div class="tweet-content">
          <div class="tweet-header">
             <div class="skeleton-line heading" style="width: 60%"></div>
          </div>
          <div class="tweet-text">
             <div class="skeleton-line" style="width: 90%"></div>
             <div class="skeleton-line" style="width: 100%"></div>
             <div class="skeleton-line" style="width: 35%"></div>
          </div>
          
          <div class="tweet-text mt-50">
            <div class="skeleton-line" style="width: 90%"></div>
            <div class="skeleton-line" style="width: 100%"></div>
            <div class="skeleton-line" style="width: 35%"></div>
         </div>
       
       </div> 
    </div>
 </div>
 

<style type='sass'>
    $body-bg: #10171E
    $item-bg: #1A1A1A
    $item-border-color: #38444d
    
    $skeleton-color: lighten($item-bg, 7%)
    $skeleton-border-radius: 3px
    $skeleton-animation-speed: 1s
    
    =square($size)
       width: $size
       height: $size
    
    %skeleton-animation
       animation: skeleton $skeleton-animation-speed ease-in-out forwards infinite
       animation-direction: alternate
    
    @keyframes skeleton
       0% 
          opacity: .2
          transform: translateY(6px) scale(0.98)
       85%, 100%
          opacity: 1
          transform: translateY(0px) scale(1)
          
    
       
    .tweet
       background-color: $item-bg
       padding: .8rem .75rem
       margin: 0 auto
       width: 100%

       border-radius: .5rem
       overflow: hidden
       &-content 
          margin-left: calc(0)
       &-header
          @extend %skeleton-animation
          transform-origin: bottom
       
    .skeleton
       background-color: $item-bg
       &-line
          height: .7rem
          background-color: $skeleton-color
          border-radius: $skeleton-border-radius
          margin-bottom: .3rem
          &.heading 
             height: 1rem
             margin-bottom: .5rem
    
</style>