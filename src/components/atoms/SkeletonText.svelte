<div class="tweet">
    <div class="skeleton">
       <div class="tweet-content">
          <div class="tweet-header">
             <div class="skeleton-line heading" style="width: 60%"></div>
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
    $skeleton-img-border-radius: .75rem
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
       margin: 0 auto
       width: 100%

       border-radius: .5rem
       overflow: hidden
       &-content 
          margin-left: calc(0)
       &-header
          @extend %skeleton-animation
          transform-origin: bottom
       &-text
          @extend %skeleton-animation
          animation-delay: 200ms
       &-footer
          display: flex
          margin-top: 1rem
          @extend %skeleton-animation
          transform-origin: bottom
          animation-delay: 400ms
       
    .skeleton
       background-color: $item-bg
       &-avatar
          +square(48px)
          background-color: $skeleton-color
          border-radius: 100%
          float: left
          @extend %skeleton-animation
       &-line
          height: .7rem
          background-color: $skeleton-color
          border-radius: $skeleton-border-radius

          &.heading 
             height: 1rem

       &-img 
          height: 250px
          background-color: $skeleton-color
          border-radius: $skeleton-img-border-radius
          margin-top: 1.5rem
          @extend %skeleton-animation
          animation-delay: 300ms
       &-button
          display: block
          +square(26px)
          background-color: $skeleton-color
          flex-shrink: 0
          &:not(:last-child)
             margin-right: 2rem
          &.rounded 
             border-radius: 100%
    
</style>