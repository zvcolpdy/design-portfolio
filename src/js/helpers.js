export const getEl = (id) => (document.getElementById(id));
export function preloadImages(srcs) {
    function loadImage(src) {
        return new Promise(function(resolve, reject) {
            var img = new Image();
            img.onload = function() {
                resolve(img);
            };
            img.onerror = img.onabort = function() {
                reject(src);
            };
            img.src = src;
        });
    }
    var promises = [];
    for (var i = 0; i < srcs.length; i++) {
        promises.push(loadImage(srcs[i]));
    }
    return Promise.all(promises);
}

export function smothScroll(element, target, duration) {
    target = Math.round(target);
    duration = Math.round(duration);
    if (duration < 0) {
        return Promise.reject("bad duration");
    }
    if (duration === 0) {
        element.scrollTop = target;
        return Promise.resolve();
    }

    var start_time = Date.now();
    var end_time = start_time + duration;

    var start_top = element.scrollTop;
    var distance = target - start_top;

    // based on http://en.wikipedia.org/wiki/Smoothstep
    var smooth_step = function(start, end, point) {
        if(point <= start) { return 0; }
        if(point >= end) { return 1; }
        var x = (point - start) / (end - start); // interpolation
        return x*x*(3 - 2*x);
    }

    return new Promise(function(resolve, reject) {
        // This is to keep track of where the element's scrollTop is
        // supposed to be, based on what we're doing
        var previous_top = element.scrollTop;

        // This is like a think function from a game loop
        var scroll_frame = function() {
            /*
            if(element.scrollTop !== previous_top) {
                reject("interrupted");
                return;
            }
            */

            // set the scrollTop for this frame
            var now = Date.now();
            var point = smooth_step(start_time, end_time, now);
            var frameTop = Math.round(start_top + (distance * point));
            element.scrollTop = frameTop;

            // check if we're done!
            if(now >= end_time) {
                resolve();
                return;
            }

            // If we were supposed to scroll but didn't, then we
            // probably hit the limit, so consider it done; not
            // interrupted.
            /*
            if(element.scrollTop === previous_top
                && element.scrollTop !== frameTop) {
                resolve();
                return;
            }
            */
            previous_top = element.scrollTop;

            // schedule next frame for execution
            requestAnimationFrame(scroll_frame);
        }

        // boostrap the animation process
        requestAnimationFrame(scroll_frame);
    });
}

export const art = [
    {
        title: "Entering Cherkassy | Personal Project",
        base_url: "../dist/img/base/48_05_30.jpg",
        highres_url: "../dist/img/highres_base/48_05_30.png"
    },
    {
        title: "Entering Cherkassy | Personal Project",
        base_url: "../dist/img/base/48_06_03_04.jpg",
        highres_url: "../dist/img/highres_base/48_06_03_04.png"
    },
    {
        title: "Entering Cherkassy | Personal Project",
        base_url: "../dist/img/base/48_06_04_9_1.jpg",
        highres_url: "../dist/img/highres_base/48_06_04_9_1.png"
    },
    {
        title: "Entering Cherkassy | Personal Project",
        base_url: "../dist/img/base/49_03_00.jpg",
        highres_url: "../dist/img/highres_base/49_03_00.png"
    },
    {
        title: "Entering Cherkassy | Personal Project",
        base_url: "../dist/img/base/49_08.jpg",
        highres_url: "../dist/img/highres_base/49_08.jpg"
    },
    {
        title: "Entering Cherkassy | Personal Project",
        base_url: "../dist/img/base/49_17.jpg",
        highres_url: "../dist/img/highres_base/49_17.jpg"
    },
    {
        title: "Entering Cherkassy | Personal Project",
        base_url: "../dist/img/base/alexey-rusyuk-a7f0b7bdd2.jpg",
        highres_url: "../dist/img/highres_base/alexey-rusyuk-a7f0b7bdd2.jpg"
    },
    {
        title: "Entering Cherkassy | Personal Project",
        base_url: "../dist/img/base/Clipboard01.jpg",
        highres_url: "../dist/img/highres_base/Clipboard01.jpg"
    },
    {
        title: "Entering Cherkassy | Personal Project",
        base_url: "../dist/img/base/Clipboard03.jpg",
        highres_url: "../dist/img/highres_base/Clipboard01.jpg"
    },
    {
        title: "Entering Cherkassy | Personal Project",
        base_url: "../dist/img/base/Clipboard04.jpg",
        highres_url: "../dist/img/highres_base/Clipboard01.jpg"
    },
    {
        title: "Entering Cherkassy | Personal Project",
        base_url: "../dist/img/base/oleksiy-rusyuk-005-1.jpg",
        highres_url: "../dist/img/highres_base/oleksiy-rusyuk-005-1.jpg"
    },
    {
        title: "Entering Cherkassy | Personal Project",
        base_url: "../dist/img/base/oleksiy-rusyuk-007-2.jpg",
        highres_url: "../dist/img/highres_base/oleksiy-rusyuk-007-2.jpg"
    },
    {
        title: "Entering Cherkassy | Personal Project",
        base_url: "../dist/img/base/oleksiy-rusyuk-008-2-p.jpg",
        highres_url: "../dist/img/highres_base/oleksiy-rusyuk-008-2-p.jpg"
    },
    {
        title: "Entering Cherkassy | Personal Project",
        base_url: "../dist/img/base/oleksiy-rusyuk-008-4-2-p.jpg",
        highres_url: "../dist/img/highres_base/oleksiy-rusyuk-008-4-2-p.jpg"
    },
    {
        title: "Entering Cherkassy | Personal Project",
        base_url: "../dist/img/base/oleksiy-rusyuk-008-p.jpg",
        highres_url: "../dist/img/highres_base/oleksiy-rusyuk-008-p.jpg"
    },
    {
        title: "Entering Cherkassy | Personal Project",
        base_url: "../dist/img/base/oleksiy-rusyuk-010-2-p.jpg",
        highres_url: "../dist/img/highres_base/oleksiy-rusyuk-010-2-p.jpg"
    },
    {
        title: "Entering Cherkassy | Personal Project",
        base_url: "../dist/img/base/oleksiy-rusyuk-010-p.jpg",
        highres_url: "../dist/img/highres_base/oleksiy-rusyuk-010-p.jpg"
    },
    {
        title: "Entering Cherkassy | Personal Project",
        base_url: "../dist/img/base/oleksiy-rusyuk-48-05-34.jpg",
        highres_url: "../dist/img/highres_base/oleksiy-rusyuk-48-05-34.jpg"
    },
    {
        title: "Entering Cherkassy | Personal Project",
        base_url: "../dist/img/base/oleksiy-rusyuk-49-0.jpg",
        highres_url: "../dist/img/highres_base/oleksiy-rusyuk-49-0.jpg"
    },
    {
        title: "Entering Cherkassy | Personal Project",
        base_url: "../dist/img/base/oleksiy-rusyuk-headquarters.jpg",
        highres_url: "../dist/img/highres_base/oleksiy-rusyuk-headquarters.jpg"
    },
    {
        title: "Entering Cherkassy | Personal Project",
        base_url: "../dist/img/base/oleksiy-rusyuk-palatka-04interior.jpg",
        highres_url: "../dist/img/highres_base/oleksiy-rusyuk-palatka-04interior.jpg"
    },
    {
        title: "Entering Cherkassy | Personal Project",
        base_url: "../dist/img/base/oleksiy-rusyuk-palatka-5.jpg",
        highres_url: "../dist/img/highres_base/oleksiy-rusyuk-palatka-5.jpg"
    },
    {
        title: "Entering Cherkassy | Personal Project",
        base_url: "../dist/img/base/oleksiy-rusyuk-rhe-03.jpg",
        highres_url: "../dist/img/highres_base/oleksiy-rusyuk-rhe-03.jpg"
    },
    {
        title: "Entering Cherkassy | Personal Project",
        base_url: "../dist/img/base/oleksiy-rusyuk-vishka-building.jpg",
        highres_url: "../dist/img/highres_base/oleksiy-rusyuk-vishka-building.jpg"
    },
    {
        title: "Entering Cherkassy | Personal Project",
        base_url: "../dist/img/base/oleksiy-rusyuk-vorota-02.jpg",
        highres_url: "../dist/img/highres_base/oleksiy-rusyuk-vorota-02.jpg"
    },
    {
        title: "Entering Cherkassy | Personal Project",
        base_url: "../dist/img/base/Post_sketch.3b.jpg",
        highres_url: "../dist/img/highres_base/Post_sketch.3b.jpg"
    }
];
