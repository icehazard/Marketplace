<script context="module">
    import { writable, derived } from 'svelte/store';

    const breakpoints = [
        ['sm',576], 
        ['md',768],
        ['lg',992],
        ['xl',1200],
        ['xxl',1400]
    ];

    //indicates window processor functioning 
    let resizeInPlay = false;

    //Default for no window variable (server-side)
    //  equal to mobile version (< sm). 
    let doesMatch = (low, high) => {
        return (!low); //true on less than
    }

    //Build media queries and ask the browser
    //  for its analysis.
    //Only used with window exists.
    let doesMatch_Window = (low, high) => {
        let queryStr = '';
        let highStr = (high) ? '(max-width: ' + (high - 1).toString() + 'px)' : '';
        if (low) {
            queryStr = '(min-width: ' + low.toString() + 'px)';
            if (high) {
                queryStr += ' and ' + highStr;
            }
        }  else {
            queryStr = highStr;
        }
        if (queryStr) {
            return window.matchMedia(queryStr).matches;
        }
        return false;
    }
    
   

    //Used to eliminate redundant store updates
    //  no need to update on each pixel change
    let lastBreakpoint = '???';
    let currentBreakpoint = '';

    // Builds the breakpoint object
    //   which contains boolean properties 
    //   built from breakpoints and
    //   apply() functions.
    // sm becomes:
    //  $mq._sm: true if small or less
    //  $mq.sm: true if small
    //  $mq.sm_: tree if small or greater
    //  $mq._smApply(data)
    //  $mq.smApply(data)
    //  $mq.sm_Apply(data)
    const buildBreakpointObject = () => {
        let retObj = {};
        currentBreakpoint = '';
        for (let i = 0; i < breakpoints.length; i++) {
            let name = breakpoints[i][0];
            let cur = breakpoints[i][1];
            let lessName = "_" + name;
            let moreName = name + "_";
            if ((i+1) === breakpoints.length) { //last object
                retObj[lessName] = true; //all widths: useless really
                retObj[moreName] = doesMatch(cur);
                retObj[name] =  retObj[moreName]; 
            } else {
                let next = breakpoints[i+1][1];
                retObj[lessName] = doesMatch(null,next);
                retObj[name] = doesMatch(cur, next);
                retObj[moreName] = doesMatch(cur);
            }
            
            //Utility functions for applying string values
            retObj[lessName + 'Apply'] = (retObj[lessName]) ? (data) => {return data;} : () => { return '';}
            retObj[moreName + 'Apply'] = (retObj[moreName]) ? (data) => {return data;} : () => { return '';}
            retObj[name + 'Apply'] = (retObj[name]) ? (data) => {return data;} : () => { return '';}
            
            if (retObj[name]) {
                currentBreakpoint = name;
            }

        }

        //Include for chained 'if's style code
        //   and rarely useful.
        //This will be moot if a zero based breakpoint ['mobile', 0]
        //   is included.
        retObj.rootApply = (currentBreakpoint) ? () => {return '';} : (data) => {return data;}
        retObj.root = (currentBreakpoint) ? false : true; 
               
       
        return retObj;
    }

    
    //The king store 
    const mediaQueryStore = writable(buildBreakpointObject());

    //Export a readonly version of the store 
    export const mq = derived(mediaQueryStore,($mediaQueryStore) => $mediaQueryStore);

    //Update the store if necessary
    const processUpdate = () => {
        let bpObj = buildBreakpointObject();
        if (lastBreakpoint != currentBreakpoint) {
            lastBreakpoint = currentBreakpoint;
            // only update the ui if the query object changed
            mediaQueryStore.set(bpObj);
        }  
    }

    const setWindowUpdates = () => {
        doesMatch = doesMatch_Window;
        processUpdate();
    }

</script>

<script>
    import { onMount } from 'svelte';

    const updateStore = () => {
        processUpdate(); 
    }   

    onMount(() => {
        setWindowUpdates();
	});

</script>

<svelte:window on:resize={updateStore} />

