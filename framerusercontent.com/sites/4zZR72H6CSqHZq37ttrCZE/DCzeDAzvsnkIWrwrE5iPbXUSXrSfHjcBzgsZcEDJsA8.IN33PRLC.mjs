import {a as Gr} from "./chunk-7YC7MKLB.mjs";
import {A as Ae, B as Ct, C as Rt, D as We, E as St, F as Ar, G as At, O as De, Q as Ze, S as c, V as Oe, W as Xe, X as Me, Y as mr, Z as ne, _ as Ye, aa as Je, b as er, ba as ha, c as a, ca as ga, d as kr, f as Cr, fa as cr, g as Re, ha as f, i as Rr, j as lr, k as oe, ka as Jr, l as Ve, m as da, n as vt, o as Se, oa as ua, p as X, pa as ba, q as fe, r as Ue, ra as _a, s as e, sa as fr, t as b, ta as $, u as Dr, ua as l, v as kt, w as Ie, wa, x as O, xa as R, y as pe, ya as Ge, z as Sr, za as qe} from "./chunk-WT4MDN6M.mjs";
import "./chunk-2TUB4ERK.mjs";
import {c as F} from "./chunk-RIUMFBNJ.mjs";
var Or = r => r;
var Qr = {
    ms: r => 1e3 * r,
    s: r => r / 1e3
};
function Ot(r, i) {
    return i ? r * (1e3 / i) : 0
}
var xa = (r, i, s) => (((1 - 3 * s + 3 * i) * r + (3 * s - 6 * i)) * r + 3 * i) * r
  , yn = 1e-7
  , vn = 12;
function kn(r, i, s, o, m) {
    let p, h, k = 0;
    do
        h = i + (s - i) / 2,
        p = xa(h, o, m) - r,
        p > 0 ? s = h : i = h;
    while (Math.abs(p) > yn && ++k < vn);
    return h
}
function Yr(r, i, s, o) {
    if (r === i && s === o)
        return Or;
    let m = p => kn(p, 0, 1, r, s);
    return p => p === 0 || p === 1 ? p : xa(m(p), i, o)
}
var nm = {
    ease: Yr(.25, .1, .25, 1),
    "ease-in": Yr(.42, 0, 1, 1),
    "ease-in-out": Yr(.42, 0, .58, 1),
    "ease-out": Yr(0, 0, .58, 1)
};
function ya(r, i) {
    var s = {};
    for (var o in r)
        Object.prototype.hasOwnProperty.call(r, o) && i.indexOf(o) < 0 && (s[o] = r[o]);
    if (r != null && typeof Object.getOwnPropertySymbols == "function") {
        var m = 0;
        for (o = Object.getOwnPropertySymbols(r); m < o.length; m++)
            i.indexOf(o[m]) < 0 && Object.prototype.propertyIsEnumerable.call(r, o[m]) && (s[o[m]] = r[o[m]])
    }
    return s
}
var pr = {};
Object.defineProperty(pr, "__esModule", {
    value: !0
});
pr.warning = function() {}
;
pr.invariant = function() {}
;
var mm = pr.__esModule
  , cm = pr.warning
  , On = pr.invariant;
var Yn = 5;
function Kr(r, i, s) {
    let o = Math.max(i - Yn, 0);
    return Ot(s - r(o), i - o)
}
var dr = {
    stiffness: 100,
    damping: 10,
    mass: 1
}
  , Ln = (r=dr.stiffness, i=dr.damping, s=dr.mass) => i / (2 * Math.sqrt(r * s));
function Tn(r, i, s) {
    return r < i && s >= i || r > i && s <= i
}
var Lt = ({stiffness: r=dr.stiffness, damping: i=dr.damping, mass: s=dr.mass, from: o=0, to: m=1, velocity: p=0, restSpeed: h=2, restDistance: k=.5}={}) => {
    p = p ? Qr.s(p) : 0;
    let g = {
        done: !1,
        hasReachedTarget: !1,
        current: o,
        target: m
    }, n = m - o, _ = Math.sqrt(r / s) / 1e3, w = Ln(r, i, s), L;
    if (w < 1) {
        let u = _ * Math.sqrt(1 - w * w);
        L = v => m - Math.exp(-w * _ * v) * ((w * _ * n - p) / u * Math.sin(u * v) + n * Math.cos(u * v))
    } else
        L = u => m - Math.exp(-_ * u) * (n + (_ * n - p) * u);
    return u => {
        g.current = L(u);
        let v = u === 0 ? p : Kr(L, u, g.current)
          , Y = Math.abs(v) <= h
          , C = Math.abs(m - g.current) <= k;
        return g.done = Y && C,
        g.hasReachedTarget = Tn(o, m, g.current),
        g
    }
}
  , va = ({from: r=0, velocity: i=0, power: s=.8, decay: o=.325, bounceDamping: m, bounceStiffness: p, changeTarget: h, min: k, max: g, restDistance: n=.5, restSpeed: _}) => {
    o = Qr.ms(o);
    let w = {
        hasReachedTarget: !1,
        done: !1,
        current: r,
        target: r
    }
      , L = y => k !== void 0 && y < k || g !== void 0 && y > g
      , u = y => k === void 0 ? g : g === void 0 || Math.abs(k - y) < Math.abs(g - y) ? k : g
      , v = s * i
      , Y = r + v
      , C = h === void 0 ? Y : h(Y);
    w.target = C,
    C !== Y && (v = C - r);
    let E = y => -v * Math.exp(-y / o), x = y => C + E(y), H = y => {
        let V = E(y)
          , ie = x(y);
        w.done = Math.abs(V) <= n,
        w.current = w.done ? C : ie
    }
    , M, q, I = y => {
        L(w.current) && (M = y,
        q = Lt({
            from: w.current,
            to: u(w.current),
            velocity: Kr(x, y, w.current),
            damping: m,
            stiffness: p,
            restDistance: n,
            restSpeed: _
        }))
    }
    ;
    return I(0),
    y => {
        let V = !1;
        return !q && M === void 0 && (V = !0,
        H(y),
        I(y)),
        M !== void 0 && y > M ? (w.hasReachedTarget = !0,
        q(y - M)) : (w.hasReachedTarget = !1,
        !V && H(y),
        w)
    }
}
  , Yt = 10
  , Pn = 1e4;
function ka(r) {
    let i, s = Yt, o = r(0), m = [o.current];
    for (; !o.done && s < Pn; )
        o = r(s),
        m.push(o.done ? o.target : o.current),
        i === void 0 && o.hasReachedTarget && (i = s),
        s += Yt;
    let p = s - Yt;
    return m.length === 1 && m.push(o.current),
    {
        keyframes: m,
        duration: p / 1e3,
        overshootDuration: (i ?? p) / 1e3
    }
}
var Nn = ["", "X", "Y", "Z"]
  , Fn = ["translate", "scale", "rotate", "skew"];
var Ca = {
    syntax: "<angle>",
    initialValue: "0deg",
    toDefaultUnit: r => r + "deg"
}
  , Hn = {
    translate: {
        syntax: "<length-percentage>",
        initialValue: "0px",
        toDefaultUnit: r => r + "px"
    },
    rotate: Ca,
    scale: {
        syntax: "<number>",
        initialValue: 1,
        toDefaultUnit: Or
    },
    skew: Ca
}
  , In = new Map
  , En = r => `--motion-${r}`
  , Ya = ["x", "y", "z"];
Fn.forEach(r => {
    Nn.forEach(i => {
        Ya.push(r + i),
        In.set(En(r + i), Hn[r])
    }
    )
}
);
var Im = new Set(Ya);
var Ra = r => document.createElement("div").animate(r, {
    duration: .001
})
  , Sa = {
    cssRegisterProperty: () => typeof CSS < "u" && Object.hasOwnProperty.call(CSS, "registerProperty"),
    waapi: () => Object.hasOwnProperty.call(Element.prototype, "animate"),
    partialKeyframes: () => {
        try {
            Ra({
                opacity: [1]
            })
        } catch {
            return !1
        }
        return !0
    }
    ,
    finished: () => !!Ra({
        opacity: [0, 1]
    }).finished
}
  , Tt = {}
  , zn = {};
for (let r in Sa)
    zn[r] = () => (Tt[r] === void 0 && (Tt[r] = Sa[r]()),
    Tt[r]);
function La(r, i) {
    var s;
    return typeof r == "string" ? i ? ((s = i[r]) !== null && s !== void 0 || (i[r] = document.querySelectorAll(r)),
    r = i[r]) : r = document.querySelectorAll(r) : r instanceof Element && (r = [r]),
    Array.from(r || [])
}
function Ta(r) {
    let i = new WeakMap;
    return (s={}) => {
        let o = new Map
          , m = (h=0, k=100, g=0, n=!1) => {
            let _ = `${h}-${k}-${g}-${n}`;
            return o.has(_) || o.set(_, r(Object.assign({
                from: h,
                to: k,
                velocity: g,
                restSpeed: n ? .05 : 2,
                restDistance: n ? .01 : .5
            }, s))),
            o.get(_)
        }
          , p = h => (i.has(h) || i.set(h, ka(h)),
        i.get(h));
        return {
            createAnimation: (h, k, g, n, _) => {
                var w, L;
                let u, v = h.length;
                if (g && v <= 2 && h.every(Bn)) {
                    let C = h[v - 1]
                      , E = v === 1 ? null : h[0]
                      , x = 0
                      , H = 0
                      , M = _?.generator;
                    if (M) {
                        let {animation: y, generatorStartTime: V} = _
                          , ie = y?.startTime || V || 0
                          , ke = y?.currentTime || performance.now() - ie
                          , t = M(ke).current;
                        H = (w = E) !== null && w !== void 0 ? w : t,
                        (v === 1 || v === 2 && h[0] === null) && (x = Kr(ee => M(ee).current, ke, t))
                    } else
                        H = (L = E) !== null && L !== void 0 ? L : parseFloat(k());
                    let q = m(H, C, x, n?.includes("scale"))
                      , I = p(q);
                    u = Object.assign(Object.assign({}, I), {
                        easing: "linear"
                    }),
                    _ && (_.generator = q,
                    _.generatorStartTime = performance.now())
                } else
                    u = {
                        easing: "ease",
                        duration: p(m(0, 100)).overshootDuration
                    };
                return u
            }
        }
    }
}
var Bn = r => typeof r != "string"
  , Em = Ta(Lt)
  , zm = Ta(va)
  , Wn = {
    any: 0,
    all: 1
};
function Zn(r, i, {root: s, margin: o, amount: m="any"}={}) {
    if (typeof IntersectionObserver > "u")
        return () => {}
        ;
    let p = La(r)
      , h = new WeakMap
      , k = n => {
        n.forEach(_ => {
            let w = h.get(_.target);
            if (_.isIntersecting !== !!w)
                if (_.isIntersecting) {
                    let L = i(_);
                    typeof L == "function" ? h.set(_.target, L) : g.unobserve(_.target)
                } else
                    w && (w(_),
                    h.delete(_.target))
        }
        )
    }
      , g = new IntersectionObserver(k,{
        root: s,
        rootMargin: o,
        threshold: typeof m == "number" ? m : Wn[m]
    });
    return p.forEach(n => g.observe(n)),
    () => g.disconnect()
}
var $r = new WeakMap, Qe;
function Xn(r, i) {
    if (i) {
        let {inlineSize: s, blockSize: o} = i[0];
        return {
            width: s,
            height: o
        }
    }
    return r instanceof SVGElement && "getBBox"in r ? r.getBBox() : {
        width: r.offsetWidth,
        height: r.offsetHeight
    }
}
function Mn({target: r, contentRect: i, borderBoxSize: s}) {
    var o;
    (o = $r.get(r)) === null || o === void 0 || o.forEach(m => {
        m({
            target: r,
            contentSize: i,
            get size() {
                return Xn(r, s)
            }
        })
    }
    )
}
function qn(r) {
    r.forEach(Mn)
}
function jn() {
    typeof ResizeObserver < "u" && (Qe = new ResizeObserver(qn))
}
function Vn(r, i) {
    Qe || jn();
    let s = La(r);
    return s.forEach(o => {
        let m = $r.get(o);
        m || (m = new Set,
        $r.set(o, m)),
        m.add(i),
        Qe?.observe(o)
    }
    ),
    () => {
        s.forEach(o => {
            let m = $r.get(o);
            m?.delete(i),
            m?.size || Qe?.unobserve(o)
        }
        )
    }
}
var et = new Set, Lr;
function Un() {
    Lr = () => {
        let r = {
            width: F.innerWidth,
            height: F.innerHeight
        }
          , i = {
            target: F,
            size: r,
            contentSize: r
        };
        et.forEach(s => s(i))
    }
    ,
    F.addEventListener("resize", Lr)
}
function Dn(r) {
    return et.add(r),
    Lr || Un(),
    () => {
        et.delete(r),
        !et.size && Lr && (Lr = void 0)
    }
}
function rt(r, i) {
    return typeof r == "function" ? Dn(r) : Vn(r, i)
}
function Pt(r, i, s) {
    r.dispatchEvent(new CustomEvent(i,{
        detail: {
            originalEvent: s
        }
    }))
}
function Aa(r, i, s) {
    r.dispatchEvent(new CustomEvent(i,{
        detail: {
            originalEntry: s
        }
    }))
}
var Jn = {
    isActive: r => !!r.inView,
    subscribe: (r, {enable: i, disable: s}, {inViewOptions: o={}}) => {
        let {once: m} = o
          , p = ya(o, ["once"]);
        return Zn(r, h => {
            if (i(),
            Aa(r, "viewenter", h),
            !m)
                return k => {
                    s(),
                    Aa(r, "viewleave", k)
                }
        }
        , p)
    }
}
  , Oa = (r, i, s) => o => {
    (!o.pointerType || o.pointerType === "mouse") && (s(),
    Pt(r, i, o))
}
  , Gn = {
    isActive: r => !!r.hover,
    subscribe: (r, {enable: i, disable: s}) => {
        let o = Oa(r, "hoverstart", i)
          , m = Oa(r, "hoverend", s);
        return r.addEventListener("pointerenter", o),
        r.addEventListener("pointerleave", m),
        () => {
            r.removeEventListener("pointerenter", o),
            r.removeEventListener("pointerleave", m)
        }
    }
}
  , Qn = {
    isActive: r => !!r.press,
    subscribe: (r, {enable: i, disable: s}) => {
        let o = p => {
            s(),
            Pt(r, "pressend", p),
            F.removeEventListener("pointerup", o)
        }
          , m = p => {
            i(),
            Pt(r, "pressstart", p),
            F.addEventListener("pointerup", o)
        }
        ;
        return r.addEventListener("pointerdown", m),
        () => {
            r.removeEventListener("pointerdown", m),
            F.removeEventListener("pointerup", o)
        }
    }
}
  , Kn = {
    inView: Jn,
    hover: Gn,
    press: Qn
}
  , Bm = ["initial", "animate", ...Object.keys(Kn), "exit"];
var $n = 100
  , ei = {
    left: r => `translateX(-${r}px)`,
    right: r => `translateX(${r}px)`,
    top: r => `translateY(-${r}px)`,
    bottom: r => `translateY(${r}px)`
}
  , Nt = typeof Animation < "u" && typeof Animation.prototype.updatePlaybackRate == "function";
function Fe(r) {
    let {slots: i, gap: s, padding: o, paddingPerSide: m, paddingTop: p, paddingRight: h, paddingBottom: k, paddingLeft: g, speed: n, hoverFactor: _, direction: w, alignment: L, sizingOptions: u, fadeOptions: v, style: Y} = r
      , {fadeContent: C, overflow: E, fadeWidth: x, fadeInset: H, fadeAlpha: M} = v
      , {widthType: q, heightType: I} = u
      , y = m ? `${p}px ${h}px ${k}px ${g}px` : `${o}px`
      , V = Ze.current() === Ze.canvas
      , ie = i.filter(Boolean)
      , ke = er.count(ie)
      , t = ke > 0;
    w === !0 && (w = "left");
    let ee = w === "left" || w === "right"
      , Ke = Sr(0)
      , Ee = ei[w]
      , Te = Ae(Ke, Ee)
      , ue = X(null)
      , be = Se( () => [Cr(), Cr()], [])
      , [re,Br] = fe({
        parent: null,
        children: null
    })
      , gr = []
      , ur = []
      , $e = 0
      , He = 0;
    V && ($e = ke ? Math.floor(10 / ke) : 0,
    He = 1),
    !V && t && re.parent && ($e = Math.round(re.parent / re.children * 2) + 1,
    $e = Math.min($e, $n),
    He = 1);
    let br = Rr( () => {
        if (t && ue.current) {
            let z = ee ? ue.current.offsetWidth : ue.current.offsetHeight
              , B = be[0].current ? ee ? be[0].current.offsetLeft : be[0].current.offsetTop : 0
              , me = (be[1].current ? ee ? be[1].current.offsetLeft + be[1].current.offsetWidth : be[1].current.offsetTop + be[1].current.offsetHeight : 0) - B + s;
            Br({
                parent: z,
                children: me
            })
        }
    }
    , [])
      , te = V ? {
        contentVisibility: "auto"
    } : {};
    if (t) {
        if (!V) {
            let z = X(!0);
            oe( () => (Dr.read(br),
            rt(ue.current, ({contentSize: B}) => {
                !z.current && (B.width || B.height) && Dr.read(br),
                z.current = !1
            }
            )), [])
        }
        gr = er.map(ie, (z, B) => {
            var Ce, me, K, j;
            let ce;
            B === 0 && (ce = be[0]),
            B === ie.length - 1 && (ce = be[1]);
            let T = {
                width: q ? (Ce = z.props) === null || Ce === void 0 ? void 0 : Ce.width : "100%",
                height: I ? (me = z.props) === null || me === void 0 ? void 0 : me.height : "100%"
            };
            return e(pe, {
                inherit: "id",
                children: e("li", {
                    ref: ce,
                    style: T,
                    children: kr(z, {
                        style: {
                            ...(K = z.props) === null || K === void 0 ? void 0 : K.style,
                            ...T,
                            flexShrink: 0,
                            ...te
                        },
                        layoutId: z.props.layoutId ? z.props.layoutId + "-original-" + B : void 0
                    }, (j = z.props) === null || j === void 0 ? void 0 : j.children)
                })
            })
        }
        )
    }
    if (!V)
        for (let z = 0; z < $e; z++)
            ur = [...ur, ...er.map(ie, (B, Ce) => {
                var me, K, j, ce, T, je;
                let ze = {
                    width: q ? (me = B.props) === null || me === void 0 ? void 0 : me.width : "100%",
                    height: I ? (K = B.props) === null || K === void 0 ? void 0 : K.height : "100%",
                    willChange: "transform"
                };
                return e(pe, {
                    inherit: "id",
                    children: e("li", {
                        style: ze,
                        "aria-hidden": !0,
                        children: kr(B, {
                            key: z + " " + Ce,
                            style: {
                                ...(j = B.props) === null || j === void 0 ? void 0 : j.style,
                                width: q ? (ce = B.props) === null || ce === void 0 ? void 0 : ce.width : "100%",
                                height: I ? (T = B.props) === null || T === void 0 ? void 0 : T.height : "100%",
                                flexShrink: 0,
                                ...te
                            },
                            layoutId: B.props.layoutId ? B.props.layoutId + "-dupe-" + z : void 0
                        }, (je = B.props) === null || je === void 0 ? void 0 : je.children)
                    }, z + "li" + Ce)
                }, z + "lg" + Ce)
            }
            )];
    let ae = re.children + re.children * Math.round(re.parent / re.children)
      , _r = X(null)
      , wr = X(null)
      , tr = X(0)
      , xr = X(!1)
      , Wr = Rt()
      , Zr = X(null)
      , le = X(null);
    if (!V) {
        let z = Ar(ue);
        Nt ? (oe( () => {
            if (!(Wr || !ae || !n))
                return le.current = Zr.current.animate({
                    transform: [Ee(0), Ee(ae)]
                }, {
                    duration: Math.abs(ae) / n * 1e3,
                    iterations: 1 / 0,
                    easing: "linear"
                }),
                () => le.current.cancel()
        }
        , [_, ae, n]),
        oe( () => {
            le.current && (z && le.current.playState === "paused" ? le.current.play() : !z && le.current.playState === "running" && le.current.pause())
        }
        , [z])) : Ct(B => {
            if (!ae || Wr || Nt)
                return;
            _r.current === null && (_r.current = B),
            B = B - _r.current;
            let me = (wr.current === null ? 0 : B - wr.current) * (n / 1e3);
            xr.current && (me *= _),
            tr.current += me,
            tr.current = We(0, ae, tr.current),
            wr.current = B,
            z && Ke.set(tr.current)
        }
        )
    }
    let Xr = ee ? "to right" : "to bottom"
      , Mr = x / 2
      , lt = 100 - x / 2
      , mt = ii(H, 0, Mr)
      , ct = 100 - H
      , yr = `linear-gradient(${Xr}, rgba(0, 0, 0, ${M}) ${mt}%, rgba(0, 0, 0, 1) ${Mr}%, rgba(0, 0, 0, 1) ${lt}%, rgba(0, 0, 0, ${M}) ${ct}%)`;
    return t ? e("section", {
        style: {
            ...Pa,
            opacity: He,
            WebkitMaskImage: C ? yr : void 0,
            MozMaskImage: C ? yr : void 0,
            maskImage: C ? yr : void 0,
            overflow: E ? "visible" : "hidden",
            padding: y
        },
        ref: ue,
        children: b(O.ul, {
            ref: Zr,
            style: {
                ...Pa,
                gap: s,
                top: w === "bottom" && Na(ae) ? -ae : void 0,
                left: w === "right" && Na(ae) ? -ae : void 0,
                placeItems: L,
                position: "relative",
                flexDirection: ee ? "row" : "column",
                ...Y,
                willChange: V ? "auto" : "transform",
                transform: Nt ? Ee(0) : Te
            },
            onMouseEnter: () => {
                xr.current = !0,
                le.current && (le.current.playbackRate = _)
            }
            ,
            onMouseLeave: () => {
                xr.current = !1,
                le.current && (le.current.playbackRate = 1)
            }
            ,
            children: [gr, ur]
        })
    }) : b("section", {
        style: ri,
        children: [e("div", {
            style: ti,
            children: "\u2728"
        }), e("p", {
            style: ai,
            children: "Connect to Content"
        }), e("p", {
            style: ni,
            children: "Add layers or components to infinitely loop on your page."
        })]
    })
}
Fe.defaultProps = {
    gap: 10,
    padding: 10,
    sizingOptions: {
        widthType: !0,
        heightType: !0
    },
    fadeOptions: {
        fadeContent: !0,
        overflow: !1,
        fadeWidth: 25,
        fadeAlpha: 0,
        fadeInset: 0
    },
    direction: !0
};
Oe(Fe, {
    slots: {
        type: c.Array,
        title: "Children",
        control: {
            type: c.ComponentInstance
        }
    },
    speed: {
        type: c.Number,
        title: "Speed",
        min: 0,
        max: 1e3,
        defaultValue: 100,
        unit: "%",
        displayStepper: !0,
        step: 5
    },
    direction: {
        type: c.Enum,
        title: "Direction",
        options: ["left", "right", "top", "bottom"],
        optionIcons: ["direction-left", "direction-right", "direction-up", "direction-down"],
        optionTitles: ["Left", "Right", "Top", "Bottom"],
        defaultValue: "left",
        displaySegmentedControl: !0
    },
    alignment: {
        type: c.Enum,
        title: "Align",
        options: ["flex-start", "center", "flex-end"],
        optionIcons: {
            direction: {
                right: ["align-top", "align-middle", "align-bottom"],
                left: ["align-top", "align-middle", "align-bottom"],
                top: ["align-left", "align-center", "align-right"],
                bottom: ["align-left", "align-center", "align-right"]
            }
        },
        defaultValue: "center",
        displaySegmentedControl: !0
    },
    gap: {
        type: c.Number,
        title: "Gap"
    },
    padding: {
        title: "Padding",
        type: c.FusedNumber,
        toggleKey: "paddingPerSide",
        toggleTitles: ["Padding", "Padding per side"],
        valueKeys: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"],
        valueLabels: ["T", "R", "B", "L"],
        min: 0
    },
    sizingOptions: {
        type: c.Object,
        title: "Sizing",
        controls: {
            widthType: {
                type: c.Boolean,
                title: "Width",
                enabledTitle: "Auto",
                disabledTitle: "Stretch",
                defaultValue: !0
            },
            heightType: {
                type: c.Boolean,
                title: "Height",
                enabledTitle: "Auto",
                disabledTitle: "Stretch",
                defaultValue: !0
            }
        }
    },
    fadeOptions: {
        type: c.Object,
        title: "Clipping",
        controls: {
            fadeContent: {
                type: c.Boolean,
                title: "Fade",
                defaultValue: !0
            },
            overflow: {
                type: c.Boolean,
                title: "Overflow",
                enabledTitle: "Show",
                disabledTitle: "Hide",
                defaultValue: !1,
                hidden(r) {
                    return r.fadeContent === !0
                }
            },
            fadeWidth: {
                type: c.Number,
                title: "Width",
                defaultValue: 25,
                min: 0,
                max: 100,
                unit: "%",
                hidden(r) {
                    return r.fadeContent === !1
                }
            },
            fadeInset: {
                type: c.Number,
                title: "Inset",
                defaultValue: 0,
                min: 0,
                max: 100,
                unit: "%",
                hidden(r) {
                    return r.fadeContent === !1
                }
            },
            fadeAlpha: {
                type: c.Number,
                title: "Opacity",
                defaultValue: 0,
                min: 0,
                max: 1,
                step: .05,
                hidden(r) {
                    return r.fadeContent === !1
                }
            }
        }
    },
    hoverFactor: {
        type: c.Number,
        title: "Hover",
        min: 0,
        max: 1,
        unit: "x",
        defaultValue: 1,
        step: .1,
        displayStepper: !0,
        description: "Slows down the speed while you are hovering."
    }
});
var Pa = {
    display: "flex",
    width: "100%",
    height: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
    placeItems: "center",
    margin: 0,
    padding: 0,
    listStyleType: "none",
    textIndent: "none"
}
  , ri = {
    display: "flex",
    width: "100%",
    height: "100%",
    placeContent: "center",
    placeItems: "center",
    flexDirection: "column",
    color: "#96F",
    background: "rgba(136, 85, 255, 0.1)",
    fontSize: 11,
    overflow: "hidden",
    padding: "20px 20px 30px 20px"
}
  , ti = {
    fontSize: 32,
    marginBottom: 10
}
  , ai = {
    margin: 0,
    marginBottom: 10,
    fontWeight: 600,
    textAlign: "center"
}
  , ni = {
    margin: 0,
    opacity: .7,
    maxWidth: 150,
    lineHeight: 1.5,
    textAlign: "center"
}
  , ii = (r, i, s) => Math.min(Math.max(r, i), s)
  , Na = r => typeof r == "number" && !isNaN(r);
var oi = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};
var si = {
    ...oi,
    borderRadius: 6,
    background: "rgba(149, 149, 149, 0.1)",
    border: "1px dashed rgba(149, 149, 149, 0.15)",
    color: "#a5a5a5",
    flexDirection: "column"
}
  , Fa = Re( (r, i) => e("div", {
    style: si,
    ref: i
}));
var Ft, Ha, li = r => (Ft || (Ft = new Map([["bold", r.createElement(r.Fragment, null, r.createElement("path", {
    d: "M222.14,105.85l-80-80a20,20,0,0,0-28.28,0l-80,80A19.86,19.86,0,0,0,28,120v96a12,12,0,0,0,12,12h64a12,12,0,0,0,12-12V164h24v52a12,12,0,0,0,12,12h64a12,12,0,0,0,12-12V120A19.86,19.86,0,0,0,222.14,105.85ZM204,204H164V152a12,12,0,0,0-12-12H104a12,12,0,0,0-12,12v52H52V121.65l76-76,76,76Z"
}))], ["duotone", r.createElement(r.Fragment, null, r.createElement("path", {
    d: "M216,120v96H152V152H104v64H40V120a8,8,0,0,1,2.34-5.66l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,216,120Z",
    opacity: "0.2"
}), r.createElement("path", {
    d: "M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z"
}))], ["fill", r.createElement(r.Fragment, null, r.createElement("path", {
    d: "M224,120v96a8,8,0,0,1-8,8H160a8,8,0,0,1-8-8V164a4,4,0,0,0-4-4H108a4,4,0,0,0-4,4v52a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V120a16,16,0,0,1,4.69-11.31l80-80a16,16,0,0,1,22.62,0l80,80A16,16,0,0,1,224,120Z"
}))], ["light", r.createElement(r.Fragment, null, r.createElement("path", {
    d: "M217.9,110.1l-80-80a14,14,0,0,0-19.8,0l-80,80A13.92,13.92,0,0,0,34,120v96a6,6,0,0,0,6,6h64a6,6,0,0,0,6-6V158h36v58a6,6,0,0,0,6,6h64a6,6,0,0,0,6-6V120A13.92,13.92,0,0,0,217.9,110.1ZM210,210H158V152a6,6,0,0,0-6-6H104a6,6,0,0,0-6,6v58H46V120a2,2,0,0,1,.58-1.42l80-80a2,2,0,0,1,2.84,0l80,80A2,2,0,0,1,210,120Z"
}))], ["regular", r.createElement(r.Fragment, null, r.createElement("path", {
    d: "M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z"
}))], ["thin", r.createElement(r.Fragment, null, r.createElement("path", {
    d: "M216.49,111.51l-80-80a12,12,0,0,0-17,0l-80,80A12,12,0,0,0,36,120v96a4,4,0,0,0,4,4h64a4,4,0,0,0,4-4V156h40v60a4,4,0,0,0,4,4h64a4,4,0,0,0,4-4V120A12,12,0,0,0,216.49,111.51ZM212,212H156V152a4,4,0,0,0-4-4H104a4,4,0,0,0-4,4v60H44V120a4,4,0,0,1,1.17-2.83l80-80a4,4,0,0,1,5.66,0l80,80A4,4,0,0,1,212,120Z"
}))]]),
Ha = r.forwardRef( (i, s) => r.createElement("g", {
    ref: s,
    ...i
}, Ft.get(i.weight)))),
Ha);
var Ia = li;
var Ea = {
    onClick: {
        type: c.EventHandler
    },
    onMouseDown: {
        type: c.EventHandler
    },
    onMouseUp: {
        type: c.EventHandler
    },
    onMouseEnter: {
        type: c.EventHandler
    },
    onMouseLeave: {
        type: c.EventHandler
    }
}
  , mi = (r, i) => r.find(s => s.toLowerCase().includes(i));
function za(r, i, s="", o, m) {
    let p = Se( () => {
        if (s == null || s?.length === 0)
            return null;
        let k = s.toLowerCase().replace(/-|\s/g, "");
        var g;
        return (g = m[k]) !== null && g !== void 0 ? g : mi(r, k)
    }
    , [o, s]);
    return i ? o : p
}
var Ht = ["Acorn", "AddressBook", "AddressBookTabs", "AirTrafficControl", "Airplane", "AirplaneInFlight", "AirplaneLanding", "AirplaneTakeoff", "AirplaneTaxiing", "AirplaneTilt", "Airplay", "Alarm", "Alien", "AlignBottom", "AlignBottomSimple", "AlignCenterVertical", "AlignLeft", "AlignLeftSimple", "AlignRight", "AlignRightSimple", "AlignTop", "AlignTopSimple", "AmazonLogo", "Ambulance", "Anchor", "AnchorSimple", "AndroidLogo", "Angle", "AngularLogo", "Aperture", "AppStoreLogo", "AppWindow", "AppleLogo", "ApplePodcastsLogo", "ApproximateEquals", "Archive", "ArchiveBox", "ArchiveTray", "Armchair", "ArrowArcLeft", "ArrowArcRight", "ArrowBendDownLeft", "ArrowBendDownRight", "ArrowBendLeftDown", "ArrowBendLeftUp", "ArrowBendRightDown", "ArrowBendRightUp", "ArrowBendUpLeft", "ArrowBendUpRight", "ArrowCircleDown", "ArrowCircleDownLeft", "ArrowCircleDownRight", "ArrowCircleLeft", "ArrowCircleRight", "ArrowCircleUp", "ArrowCircleUpLeft", "ArrowCircleUpRight", "ArrowClockwise", "ArrowDown", "ArrowDownLeft", "ArrowDownRight", "ArrowElbowDownLeft", "ArrowElbowDownRight", "ArrowElbowLeft", "ArrowElbowLeftDown", "ArrowElbowLeftUp", "ArrowElbowRight", "ArrowElbowRightDown", "ArrowElbowRightUp", "ArrowElbowUpLeft", "ArrowElbowUpRight", "ArrowFatDown", "ArrowFatLeft", "ArrowFatLineDown", "ArrowFatLineLeft", "ArrowFatLineRight", "ArrowFatLineUp", "ArrowFatLinesDown", "ArrowFatLinesLeft", "ArrowFatLinesRight", "ArrowFatLinesUp", "ArrowFatRight", "ArrowFatUp", "ArrowLeft", "ArrowLineDown", "ArrowLineDownLeft", "ArrowLineDownRight", "ArrowLineLeft", "ArrowLineRight", "ArrowLineUp", "ArrowLineUpLeft", "ArrowLineUpRight", "ArrowRight", "ArrowSquareDown", "ArrowSquareDownLeft", "ArrowSquareDownRight", "ArrowSquareIn", "ArrowSquareLeft", "ArrowSquareOut", "ArrowSquareRight", "ArrowSquareUp", "ArrowSquareUpLeft", "ArrowSquareUpRight", "ArrowUDownLeft", "ArrowUDownRight", "ArrowULeftDown", "ArrowULeftUp", "ArrowURightDown", "ArrowURightUp", "ArrowUUpLeft", "ArrowUUpRight", "ArrowUp", "ArrowUpLeft", "ArrowUpRight", "ArrowsClockwise", "ArrowsDownUp", "ArrowsHorizontal", "ArrowsIn", "ArrowsInCardinal", "ArrowsInLineVertical", "ArrowsInSimple", "ArrowsLeftRight", "ArrowsMerge", "ArrowsOut", "ArrowsOutCardinal", "ArrowsOutSimple", "ArrowsSplit", "ArrowsVertical", "Article", "ArticleMedium", "ArticleNyTimes", "Asclepius", "Asterisk", "AsteriskSimple", "At", "Atom", "Avocado", "Axe", "Baby", "BabyCarriage", "Backpack", "Backspace", "Bag", "BagSimple", "Balloon", "Bandaids", "Bank", "Barbell", "Barcode", "Barn", "Barricade", "Baseball", "BaseballCap", "BaseballHelmet", "Basket", "Basketball", "Bathtub", "BatteryCharging", "BatteryEmpty", "BatteryFull", "BatteryHigh", "BatteryLow", "BatteryMedium", "BatteryPlus", "BatteryPlusVertical", "BatteryVerticalEmpty", "BatteryVerticalFull", "BatteryVerticalHigh", "BatteryVerticalLow", "BatteryWarning", "BeachBall", "Beanie", "Bed", "BeerBottle", "BeerStein", "BehanceLogo", "Bell", "BellRinging", "BellSimple", "BellSimpleRinging", "BellSimpleSlash", "BellSimpleZ", "BellSlash", "BellZ", "Belt", "BezierCurve", "Bicycle", "Binary", "Binoculars", "Biohazard", "Bird", "Blueprint", "Bluetooth", "BluetoothConnected", "BluetoothSlash", "BluetoothX", "Boat", "Bomb", "Bone", "Book", "BookBookmark", "BookOpen", "BookOpenText", "BookOpenUser", "BookUser", "Bookmark", "BookmarkSimple", "Bookmarks", "BookmarksSimple", "Books", "Boot", "Boules", "BoundingBox", "BowlFood", "BowlSteam", "BowlingBall", "BoxArrowDown", "BoxArrowUp", "BoxingGlove", "BracketsAngle", "BracketsCurly", "BracketsRound", "BracketsSquare", "Brain", "Brandy", "Bread", "Bridge", "Briefcase", "BriefcaseMetal", "Broadcast", "Broom", "Browser", "Browsers", "Bug", "BugBeetle", "BugDroid", "Building", "BuildingApartment", "BuildingOffice", "Buildings", "Bulldozer", "Bus", "Butterfly", "CableCar", "Cactus", "Cake", "Calculator", "Calendar", "CalendarBlank", "CalendarCheck", "CalendarDot", "CalendarDots", "CalendarHeart", "CalendarMinus", "CalendarPlus", "CalendarSlash", "CalendarStar", "CalendarX", "CallBell", "Camera", "CameraPlus", "CameraRotate", "CameraSlash", "Campfire", "Car", "CarBattery", "CarProfile", "CarSimple", "Cardholder", "Cards", "CardsThree", "CaretCircleDoubleUp", "CaretCircleDown", "CaretCircleLeft", "CaretCircleRight", "CaretCircleUp", "CaretCircleUpDown", "CaretDoubleDown", "CaretDoubleLeft", "CaretDoubleRight", "CaretDoubleUp", "CaretDown", "CaretLeft", "CaretLineDown", "CaretLineLeft", "CaretLineRight", "CaretLineUp", "CaretRight", "CaretUp", "CaretUpDown", "Carrot", "CashRegister", "CassetteTape", "CastleTurret", "Cat", "CellSignalFull", "CellSignalHigh", "CellSignalLow", "CellSignalMedium", "CellSignalNone", "CellSignalSlash", "CellSignalX", "CellTower", "Certificate", "Chair", "Chalkboard", "ChalkboardSimple", "ChalkboardTeacher", "Champagne", "ChargingStation", "ChartBar", "ChartBarHorizontal", "ChartDonut", "ChartLine", "ChartLineDown", "ChartLineUp", "ChartPie", "ChartPieSlice", "ChartPolar", "ChartScatter", "Chat", "ChatCentered", "ChatCenteredDots", "ChatCenteredSlash", "ChatCenteredText", "ChatCircle", "ChatCircleDots", "ChatCircleSlash", "ChatCircleText", "ChatDots", "ChatSlash", "ChatTeardrop", "ChatTeardropDots", "ChatTeardropSlash", "ChatTeardropText", "ChatText", "Chats", "ChatsCircle", "ChatsTeardrop", "Check", "CheckCircle", "CheckFat", "CheckSquare", "CheckSquareOffset", "Checkerboard", "Checks", "Cheers", "Cheese", "ChefHat", "Cherries", "Church", "Cigarette", "CigaretteSlash", "Circle", "CircleDashed", "CircleHalf", "CircleHalfTilt", "CircleNotch", "CirclesFour", "CirclesThree", "CirclesThreePlus", "Circuitry", "City", "Clipboard", "ClipboardText", "Clock", "ClockAfternoon", "ClockClockwise", "ClockCountdown", "ClockUser", "ClosedCaptioning", "Cloud", "CloudArrowDown", "CloudArrowUp", "CloudCheck", "CloudFog", "CloudLightning", "CloudMoon", "CloudRain", "CloudSlash", "CloudSnow", "CloudSun", "CloudWarning", "CloudX", "Clover", "Club", "CoatHanger", "CodaLogo", "Code", "CodeBlock", "CodeSimple", "CodepenLogo", "CodesandboxLogo", "Coffee", "CoffeeBean", "Coin", "CoinVertical", "Coins", "Columns", "ColumnsPlusLeft", "ColumnsPlusRight", "Command", "Compass", "CompassRose", "CompassTool", "ComputerTower", "Confetti", "ContactlessPayment", "Control", "Cookie", "CookingPot", "Copy", "CopySimple", "Copyleft", "Copyright", "CornersIn", "CornersOut", "Couch", "CourtBasketball", "Cow", "CowboyHat", "Cpu", "Crane", "CraneTower", "CreditCard", "Cricket", "Crop", "Cross", "Crosshair", "CrosshairSimple", "Crown", "CrownCross", "CrownSimple", "Cube", "CubeFocus", "CubeTransparent", "CurrencyBtc", "CurrencyCircleDollar", "CurrencyCny", "CurrencyDollar", "CurrencyDollarSimple", "CurrencyEth", "CurrencyEur", "CurrencyGbp", "CurrencyInr", "CurrencyJpy", "CurrencyKrw", "CurrencyKzt", "CurrencyNgn", "CurrencyRub", "Cursor", "CursorClick", "CursorText", "Cylinder", "Database", "Desk", "Desktop", "DesktopTower", "Detective", "DevToLogo", "DeviceMobile", "DeviceMobileCamera", "DeviceMobileSlash", "DeviceMobileSpeaker", "DeviceRotate", "DeviceTablet", "DeviceTabletCamera", "DeviceTabletSpeaker", "Devices", "Diamond", "DiamondsFour", "DiceFive", "DiceFour", "DiceOne", "DiceSix", "DiceThree", "DiceTwo", "Disc", "DiscoBall", "DiscordLogo", "Divide", "Dna", "Dog", "Door", "DoorOpen", "Dot", "DotOutline", "DotsNine", "DotsSix", "DotsSixVertical", "DotsThree", "DotsThreeCircle", "DotsThreeOutline", "DotsThreeVertical", "Download", "DownloadSimple", "Dress", "Dresser", "DribbbleLogo", "Drone", "Drop", "DropHalf", "DropHalfBottom", "DropSimple", "DropSlash", "DropboxLogo", "Ear", "EarSlash", "Egg", "EggCrack", "Eject", "EjectSimple", "Elevator", "Empty", "Engine", "Envelope", "EnvelopeOpen", "EnvelopeSimple", "EnvelopeSimpleOpen", "Equalizer", "Equals", "Eraser", "EscalatorDown", "EscalatorUp", "Exam", "ExclamationMark", "Exclude", "ExcludeSquare", "Export", "Eye", "EyeClosed", "EyeSlash", "Eyedropper", "EyedropperSample", "Eyeglasses", "Eyes", "FaceMask", "FacebookLogo", "Factory", "Faders", "FadersHorizontal", "FalloutShelter", "Fan", "Farm", "FastForward", "FastForwardCircle", "Feather", "FediverseLogo", "FigmaLogo", "File", "FileArchive", "FileArrowDown", "FileArrowUp", "FileAudio", "FileC", "FileCloud", "FileCode", "FileCpp", "FileCss", "FileCsv", "FileDashed", "FileDoc", "FileHtml", "FileImage", "FileIni", "FileJpg", "FileJs", "FileJsx", "FileLock", "FileMagnifyingGlass", "FileMd", "FileMinus", "FilePdf", "FilePlus", "FilePng", "FilePpt", "FilePy", "FileRs", "FileSql", "FileSvg", "FileText", "FileTs", "FileTsx", "FileTxt", "FileVideo", "FileVue", "FileX", "FileXls", "FileZip", "Files", "FilmReel", "FilmScript", "FilmSlate", "FilmStrip", "Fingerprint", "FingerprintSimple", "FinnTheHuman", "Fire", "FireExtinguisher", "FireSimple", "FireTruck", "FirstAid", "FirstAidKit", "Fish", "FishSimple", "Flag", "FlagBanner", "FlagBannerFold", "FlagCheckered", "FlagPennant", "Flame", "Flashlight", "Flask", "FlipHorizontal", "FlipVertical", "FloppyDisk", "FloppyDiskBack", "FlowArrow", "Flower", "FlowerLotus", "FlowerTulip", "FlyingSaucer", "Folder", "FolderDashed", "FolderLock", "FolderMinus", "FolderNotch", "FolderNotchMinus", "FolderNotchOpen", "FolderNotchPlus", "FolderOpen", "FolderPlus", "FolderSimple", "FolderSimpleDashed", "FolderSimpleLock", "FolderSimpleMinus", "FolderSimplePlus", "FolderSimpleStar", "FolderSimpleUser", "FolderStar", "FolderUser", "Folders", "Football", "FootballHelmet", "Footprints", "ForkKnife", "FourK", "FrameCorners", "FramerLogo", "Function", "Funnel", "FunnelSimple", "FunnelSimpleX", "FunnelX", "GameController", "Garage", "GasCan", "GasPump", "Gauge", "Gavel", "Gear", "GearFine", "GearSix", "GenderFemale", "GenderIntersex", "GenderMale", "GenderNeuter", "GenderNonbinary", "GenderTransgender", "Ghost", "Gif", "Gift", "GitBranch", "GitCommit", "GitDiff", "GitFork", "GitMerge", "GitPullRequest", "GithubLogo", "GitlabLogo", "GitlabLogoSimple", "Globe", "GlobeHemisphereEast", "GlobeHemisphereWest", "GlobeSimple", "GlobeSimpleX", "GlobeStand", "GlobeX", "Goggles", "Golf", "GoodreadsLogo", "GoogleCardboardLogo", "GoogleChromeLogo", "GoogleDriveLogo", "GoogleLogo", "GooglePhotosLogo", "GooglePlayLogo", "GooglePodcastsLogo", "Gps", "GpsFix", "GpsSlash", "Gradient", "GraduationCap", "Grains", "GrainsSlash", "Graph", "GraphicsCard", "GreaterThan", "GreaterThanOrEqual", "GridFour", "GridNine", "Guitar", "HairDryer", "Hamburger", "Hammer", "Hand", "HandArrowDown", "HandArrowUp", "HandCoins", "HandDeposit", "HandEye", "HandFist", "HandGrabbing", "HandHeart", "HandPalm", "HandPeace", "HandPointing", "HandSoap", "HandSwipeLeft", "HandSwipeRight", "HandTap", "HandWaving", "HandWithdraw", "Handbag", "HandbagSimple", "HandsClapping", "HandsPraying", "Handshake", "HardDrive", "HardDrives", "HardHat", "Hash", "HashStraight", "HeadCircuit", "Headlights", "Headphones", "Headset", "Heart", "HeartBreak", "HeartHalf", "HeartStraight", "HeartStraightBreak", "Heartbeat", "Hexagon", "HighDefinition", "HighHeel", "Highlighter", "HighlighterCircle", "Hockey", "Hoodie", "Horse", "Hospital", "Hourglass", "HourglassHigh", "HourglassLow", "HourglassMedium", "HourglassSimple", "HourglassSimpleHigh", "HourglassSimpleLow", "House", "HouseLine", "HouseSimple", "Hurricane", "IceCream", "IdentificationBadge", "IdentificationCard", "Image", "ImageBroken", "ImageSquare", "Images", "ImagesSquare", "Infinity", "Info", "InstagramLogo", "Intersect", "IntersectSquare", "IntersectThree", "Intersection", "Invoice", "Island", "Jar", "JarLabel", "Jeep", "Joystick", "Kanban", "Key", "KeyReturn", "Keyboard", "Keyhole", "Knife", "Ladder", "LadderSimple", "Lamp", "LampPendant", "Laptop", "Lasso", "LastfmLogo", "Layout", "Leaf", "Lectern", "Lego", "LegoSmiley", "LessThan", "LessThanOrEqual", "LetterCircleH", "LetterCircleP", "LetterCircleV", "Lifebuoy", "Lightbulb", "LightbulbFilament", "Lighthouse", "Lightning", "LightningA", "LightningSlash", "LineSegment", "LineSegments", "LineVertical", "Link", "LinkBreak", "LinkSimple", "LinkSimpleBreak", "LinkSimpleHorizontal", "LinkedinLogo", "LinktreeLogo", "LinuxLogo", "List", "ListBullets", "ListChecks", "ListDashes", "ListHeart", "ListMagnifyingGlass", "ListNumbers", "ListPlus", "ListStar", "Lock", "LockKey", "LockKeyOpen", "LockLaminated", "LockLaminatedOpen", "LockOpen", "LockSimple", "LockSimpleOpen", "Lockers", "Log", "MagicWand", "Magnet", "MagnetStraight", "MagnifyingGlass", "MagnifyingGlassMinus", "MagnifyingGlassPlus", "Mailbox", "MapPin", "MapPinArea", "MapPinLine", "MapPinPlus", "MapPinSimple", "MapPinSimpleArea", "MapPinSimpleLine", "MapTrifold", "MarkdownLogo", "MarkerCircle", "Martini", "MaskHappy", "MaskSad", "MastodonLogo", "MathOperations", "MatrixLogo", "Medal", "MedalMilitary", "MediumLogo", "Megaphone", "MegaphoneSimple", "MemberOf", "Memory", "MessengerLogo", "MetaLogo", "Meteor", "Metronome", "Microphone", "MicrophoneSlash", "MicrophoneStage", "Microscope", "MicrosoftExcelLogo", "MicrosoftOutlookLogo", "MicrosoftTeamsLogo", "MicrosoftWordLogo", "Minus", "MinusCircle", "MinusSquare", "Money", "MoneyWavy", "Monitor", "MonitorArrowUp", "MonitorPlay", "Moon", "MoonStars", "Moped", "MopedFront", "Mosque", "Motorcycle", "Mountains", "Mouse", "MouseLeftClick", "MouseMiddleClick", "MouseRightClick", "MouseScroll", "MouseSimple", "MusicNote", "MusicNoteSimple", "MusicNotes", "MusicNotesMinus", "MusicNotesPlus", "MusicNotesSimple", "NavigationArrow", "Needle", "Network", "NetworkSlash", "NetworkX", "Newspaper", "NewspaperClipping", "NotEquals", "NotMemberOf", "NotSubsetOf", "NotSupersetOf", "Notches", "Note", "NoteBlank", "NotePencil", "Notebook", "Notepad", "Notification", "NotionLogo", "NuclearPlant", "NumberCircleEight", "NumberCircleFive", "NumberCircleFour", "NumberCircleNine", "NumberCircleOne", "NumberCircleSeven", "NumberCircleSix", "NumberCircleThree", "NumberCircleTwo", "NumberCircleZero", "NumberEight", "NumberFive", "NumberFour", "NumberNine", "NumberOne", "NumberSeven", "NumberSix", "NumberSquareEight", "NumberSquareFive", "NumberSquareFour", "NumberSquareNine", "NumberSquareOne", "NumberSquareSeven", "NumberSquareSix", "NumberSquareThree", "NumberSquareTwo", "NumberSquareZero", "NumberThree", "NumberTwo", "NumberZero", "Numpad", "Nut", "NyTimesLogo", "Octagon", "OfficeChair", "Onigiri", "OpenAiLogo", "Option", "Orange", "OrangeSlice", "Oven", "Package", "PaintBrush", "PaintBrushBroad", "PaintBrushHousehold", "PaintBucket", "PaintRoller", "Palette", "Panorama", "Pants", "PaperPlane", "PaperPlaneRight", "PaperPlaneTilt", "Paperclip", "PaperclipHorizontal", "Parachute", "Paragraph", "Parallelogram", "Park", "Password", "Path", "PatreonLogo", "Pause", "PauseCircle", "PawPrint", "PaypalLogo", "Peace", "Pen", "PenNib", "PenNibStraight", "Pencil", "PencilCircle", "PencilLine", "PencilRuler", "PencilSimple", "PencilSimpleLine", "PencilSimpleSlash", "PencilSlash", "Pentagon", "Pentagram", "Pepper", "Percent", "Person", "PersonArmsSpread", "PersonSimple", "PersonSimpleBike", "PersonSimpleCircle", "PersonSimpleHike", "PersonSimpleRun", "PersonSimpleSki", "PersonSimpleSwim", "PersonSimpleTaiChi", "PersonSimpleThrow", "PersonSimpleWalk", "Perspective", "Phone", "PhoneCall", "PhoneDisconnect", "PhoneIncoming", "PhoneList", "PhoneOutgoing", "PhonePause", "PhonePlus", "PhoneSlash", "PhoneTransfer", "PhoneX", "PhosphorLogo", "Pi", "PianoKeys", "PicnicTable", "PictureInPicture", "PiggyBank", "Pill", "PingPong", "PintGlass", "PinterestLogo", "Pinwheel", "Pipe", "PipeWrench", "PixLogo", "Pizza", "Placeholder", "Planet", "Plant", "Play", "PlayCircle", "PlayPause", "Playlist", "Plug", "PlugCharging", "Plugs", "PlugsConnected", "Plus", "PlusCircle", "PlusMinus", "PlusSquare", "PokerChip", "PoliceCar", "Polygon", "Popcorn", "Popsicle", "PottedPlant", "Power", "Prescription", "Presentation", "PresentationChart", "Printer", "Prohibit", "ProhibitInset", "ProjectorScreen", "ProjectorScreenChart", "Pulse", "PushPin", "PushPinSimple", "PushPinSimpleSlash", "PushPinSlash", "PuzzlePiece", "QrCode", "Question", "QuestionMark", "Queue", "Quotes", "Rabbit", "Racquet", "Radical", "Radio", "RadioButton", "Radioactive", "Rainbow", "RainbowCloud", "Ranking", "ReadCvLogo", "Receipt", "ReceiptX", "Record", "Rectangle", "RectangleDashed", "Recycle", "RedditLogo", "Repeat", "RepeatOnce", "ReplitLogo", "Resize", "Rewind", "RewindCircle", "RoadHorizon", "Robot", "Rocket", "RocketLaunch", "Rows", "RowsPlusBottom", "RowsPlusTop", "Rss", "RssSimple", "Rug", "Ruler", "Sailboat", "Scales", "Scan", "ScanSmiley", "Scissors", "Scooter", "Screencast", "Screwdriver", "Scribble", "ScribbleLoop", "Scroll", "Seal", "SealCheck", "SealPercent", "SealQuestion", "SealWarning", "Seat", "Seatbelt", "SecurityCamera", "Selection", "SelectionAll", "SelectionBackground", "SelectionForeground", "SelectionInverse", "SelectionPlus", "SelectionSlash", "Shapes", "Share", "ShareFat", "ShareNetwork", "Shield", "ShieldCheck", "ShieldCheckered", "ShieldChevron", "ShieldPlus", "ShieldSlash", "ShieldStar", "ShieldWarning", "ShippingContainer", "ShirtFolded", "ShootingStar", "ShoppingBag", "ShoppingBagOpen", "ShoppingCart", "ShoppingCartSimple", "Shovel", "Shower", "Shrimp", "Shuffle", "ShuffleAngular", "ShuffleSimple", "Sidebar", "SidebarSimple", "Sigma", "SignIn", "SignOut", "Signature", "Signpost", "SimCard", "Siren", "SketchLogo", "SkipBack", "SkipBackCircle", "SkipForward", "SkipForwardCircle", "Skull", "SkypeLogo", "SlackLogo", "Sliders", "SlidersHorizontal", "Slideshow", "Smiley", "SmileyAngry", "SmileyBlank", "SmileyMeh", "SmileyMelting", "SmileyNervous", "SmileySad", "SmileySticker", "SmileyWink", "SmileyXEyes", "SnapchatLogo", "Sneaker", "SneakerMove", "Snowflake", "SoccerBall", "Sock", "SolarPanel", "SolarRoof", "SortAscending", "SortDescending", "SoundcloudLogo", "Spade", "Sparkle", "SpeakerHifi", "SpeakerHigh", "SpeakerLow", "SpeakerNone", "SpeakerSimpleHigh", "SpeakerSimpleLow", "SpeakerSimpleNone", "SpeakerSimpleSlash", "SpeakerSimpleX", "SpeakerSlash", "SpeakerX", "Speedometer", "Sphere", "Spinner", "SpinnerBall", "SpinnerGap", "Spiral", "SplitHorizontal", "SplitVertical", "SpotifyLogo", "SprayBottle", "Square", "SquareHalf", "SquareHalfBottom", "SquareLogo", "SquareSplitVertical", "SquaresFour", "Stack", "StackMinus", "StackOverflowLogo", "StackPlus", "StackSimple", "Stairs", "Stamp", "StandardDefinition", "Star", "StarAndCrescent", "StarFour", "StarHalf", "StarOfDavid", "SteamLogo", "SteeringWheel", "Steps", "Stethoscope", "Sticker", "Stool", "Stop", "StopCircle", "Storefront", "Strategy", "StripeLogo", "Student", "SubsetOf", "SubsetProperOf", "Subtitles", "SubtitlesSlash", "Subtract", "SubtractSquare", "Subway", "Suitcase", "SuitcaseRolling", "SuitcaseSimple", "Sun", "SunDim", "SunHorizon", "Sunglasses", "SupersetOf", "SupersetProperOf", "Swap", "Swatches", "SwimmingPool", "Sword", "Synagogue", "Syringe", "TShirt", "Table", "Tabs", "Tag", "TagChevron", "TagSimple", "Target", "Taxi", "TeaBag", "TelegramLogo", "Television", "TelevisionSimple", "TennisBall", "Tent", "Terminal", "TerminalWindow", "TestTube", "TextAUnderline", "TextAa", "TextAlignCenter", "TextAlignJustify", "TextAlignLeft", "TextAlignRight", "TextB", "TextColumns", "TextH", "TextHFive", "TextHFour", "TextHOne", "TextHSix", "TextHThree", "TextHTwo", "TextIndent", "TextItalic", "TextOutdent", "TextStrikethrough", "TextSubscript", "TextSuperscript", "TextT", "TextTSlash", "TextUnderline", "Textbox", "Thermometer", "ThermometerCold", "ThermometerHot", "ThermometerSimple", "ThreadsLogo", "ThreeD", "ThumbsDown", "ThumbsUp", "Ticket", "TidalLogo", "TiktokLogo", "Tilde", "Timer", "TipJar", "Tipi", "Tire", "ToggleLeft", "ToggleRight", "Toilet", "ToiletPaper", "Toolbox", "Tooth", "Tornado", "Tote", "ToteSimple", "Towel", "Tractor", "Trademark", "TrademarkRegistered", "TrafficCone", "TrafficSign", "TrafficSignal", "Train", "TrainRegional", "TrainSimple", "Tram", "Translate", "Trash", "TrashSimple", "Tray", "TrayArrowDown", "TrayArrowUp", "TreasureChest", "Tree", "TreeEvergreen", "TreePalm", "TreeStructure", "TreeView", "TrendDown", "TrendUp", "Triangle", "TriangleDashed", "Trolley", "TrolleySuitcase", "Trophy", "Truck", "TruckTrailer", "TumblrLogo", "TwitchLogo", "TwitterLogo", "Umbrella", "UmbrellaSimple", "Union", "Unite", "UniteSquare", "Upload", "UploadSimple", "Usb", "User", "UserCheck", "UserCircle", "UserCircleCheck", "UserCircleDashed", "UserCircleGear", "UserCircleMinus", "UserCirclePlus", "UserFocus", "UserGear", "UserList", "UserMinus", "UserPlus", "UserRectangle", "UserSound", "UserSquare", "UserSwitch", "Users", "UsersFour", "UsersThree", "Van", "Vault", "VectorThree", "VectorTwo", "Vibrate", "Video", "VideoCamera", "VideoCameraSlash", "VideoConference", "Vignette", "VinylRecord", "VirtualReality", "Virus", "Visor", "Voicemail", "Volleyball", "Wall", "Wallet", "Warehouse", "Warning", "WarningCircle", "WarningDiamond", "WarningOctagon", "WashingMachine", "Watch", "WaveSawtooth", "WaveSine", "WaveSquare", "WaveTriangle", "Waveform", "WaveformSlash", "Waves", "Webcam", "WebcamSlash", "WebhooksLogo", "WechatLogo", "WhatsappLogo", "Wheelchair", "WheelchairMotion", "WifiHigh", "WifiLow", "WifiMedium", "WifiNone", "WifiSlash", "WifiX", "Wind", "Windmill", "WindowsLogo", "Wine", "Wrench", "X", "XCircle", "XLogo", "XSquare", "Yarn", "YinYang", "YoutubeLogo"]
  , ci = "https://framer.com/m/phosphor-icons/"
  , Ba = ["thin", "light", "regular", "bold", "fill", "duotone"]
  , fi = Ht.reduce( (r, i) => (r[i.toLowerCase()] = i,
r), {});
function Le(r) {
    let {color: i, selectByList: s, iconSearch: o, iconSelection: m, onClick: p, onMouseDown: h, onMouseUp: k, onMouseEnter: g, onMouseLeave: n, weight: _, mirrored: w} = r
      , L = X(!1)
      , u = za(Ht, s, o, m, fi)
      , [v,Y] = fe(u === "Home" ? Ia(Ue) : null);
    async function C() {
        try {
            let q = await import(`${ci}${u}.js@0.0.57`);
            L.current && Y(q.default(Ue))
        } catch {
            L.current && Y(null)
        }
    }
    oe( () => (L.current = !0,
    C(),
    () => {
        L.current = !1
    }
    ), [u]);
    let x = Ze.current() === Ze.canvas ? e(Fa, {}) : null;
    return e(O.div, {
        style: {
            display: "contents"
        },
        onClick: p,
        onMouseEnter: g,
        onMouseLeave: n,
        onMouseDown: h,
        onMouseUp: k,
        children: v ? e("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 256 256",
            style: {
                userSelect: "none",
                width: "100%",
                height: "100%",
                display: "inline-block",
                fill: i,
                color: i,
                flexShrink: 0,
                transform: w ? "scale(-1, 1)" : void 0
            },
            focusable: "false",
            color: i,
            children: e(v, {
                color: i,
                weight: _
            })
        }) : x
    })
}
Le.displayName = "Phosphor";
Le.defaultProps = {
    width: 24,
    height: 24,
    iconSelection: "House",
    iconSearch: "House",
    color: "#66F",
    selectByList: !0,
    weight: "regular",
    mirrored: !1
};
Oe(Le, {
    selectByList: {
        type: c.Boolean,
        title: "Select",
        enabledTitle: "List",
        disabledTitle: "Search",
        defaultValue: Le.defaultProps.selectByList
    },
    iconSelection: {
        type: c.Enum,
        options: Ht,
        defaultValue: Le.defaultProps.iconSelection,
        title: "Name",
        hidden: ({selectByList: r}) => !r,
        description: "Find every icon name on the [Phosphor site](https://phosphoricons.com/)"
    },
    iconSearch: {
        type: c.String,
        title: "Name",
        placeholder: "Menu, Wifi, Box\u2026",
        hidden: ({selectByList: r}) => r
    },
    color: {
        type: c.Color,
        title: "Color",
        defaultValue: Le.defaultProps.color
    },
    weight: {
        type: c.Enum,
        title: "Weight",
        optionTitles: Ba.map(r => r.charAt(0).toUpperCase() + r.slice(1)),
        options: Ba,
        defaultValue: Le.defaultProps.weight
    },
    mirrored: {
        type: c.Boolean,
        enabledTitle: "Yes",
        disabledTitle: "No",
        defaultValue: Le.defaultProps.mirrored
    },
    ...Ea
});
var tt = () => typeof document == "object";
function pi() {
    if (tt()) {
        if (typeof document.hidden < "u")
            return "visibilitychange";
        if (typeof document.msHidden < "u")
            return "msvisibilitychange";
        if (typeof document.webkitHidden < "u")
            return "webkitvisibilitychange"
    }
}
function di() {
    if (tt()) {
        if (typeof document.hidden < "u")
            return "hidden";
        if (typeof document.msHidden < "u")
            return "msHidden";
        if (typeof document.webkitHidden < "u")
            return "webkitHidden"
    }
}
function Wa() {
    if (tt())
        return !document[di()]
}
function Za() {
    if (!tt())
        return;
    let[r,i] = fe(Wa())
      , s = () => i(Wa());
    return oe( () => {
        let o = pi();
        return document.addEventListener(o, s, !1),
        () => {
            document.removeEventListener(o, s)
        }
    }
    ),
    r
}
var It = .001;
function U(r) {
    let {slots: i, startFrom: s, direction: o, effectsOptions: m, autoPlayControl: p, dragControl: h, alignment: k, gap: g, padding: n, paddingPerSide: _, paddingTop: w, paddingRight: L, paddingBottom: u, paddingLeft: v, itemAmount: Y, fadeOptions: C, intervalControl: E, transitionControl: x, arrowOptions: H, borderRadius: M, progressOptions: q, style: I} = r
      , {effectsOpacity: y, effectsScale: V, effectsRotate: ie, effectsPerspective: ke, effectsHover: t} = m
      , {fadeContent: ee, overflow: Ke, fadeWidth: Ee, fadeInset: Te, fadeAlpha: ue} = C
      , {showMouseControls: be, arrowSize: re, arrowRadius: Br, arrowFill: gr, leftArrow: ur, rightArrow: $e, arrowShouldSpace: He=!0, arrowShouldFadeIn: br=!1, arrowPosition: te, arrowPadding: ae, arrowGap: _r, arrowPaddingTop: wr, arrowPaddingRight: tr, arrowPaddingBottom: xr, arrowPaddingLeft: Wr} = H
      , {showProgressDots: Zr, dotSize: le, dotsInset: Xr, dotsRadius: Mr, dotsPadding: lt, dotsGap: mt, dotsFill: ct, dotsBackground: yr, dotsActiveOpacity: z, dotsOpacity: B, dotsBlur: Ce} = q
      , me = _ ? `${w}px ${L}px ${u}px ${v}px` : `${n}px`
      , K = Ze.current() === Ze.canvas
      , j = i.filter(Boolean)
      , ce = er.count(j) > 0
      , T = o === "left" || o === "right"
      , je = o === "right" || o === "bottom";
    if (!ce)
        return b("section", {
            style: hi,
            children: [e("div", {
                style: gi,
                children: "\u2B50\uFE0F"
            }), e("p", {
                style: ui,
                children: "Connect to Content"
            }), e("p", {
                style: bi,
                children: "Add layers or components to make infinite auto-playing slideshows."
            })]
        });
    let ze = X(null)
      , Q = Se( () => j.map(A => Cr()), [j])
      , ft = X(void 0)
      , [Z,Ka] = fe({
        parent: null,
        children: null,
        item: null,
        itemWidth: null,
        itemHeight: null,
        viewportLength: null
    })
      , [$a,Gt] = fe(!1)
      , [en,Qt] = fe(p)
      , [rn,Kt] = fe(!1)
      , [ar,$t] = fe(!1)
      , pt = []
      , ea = 4;
    K && (ea = 1);
    let ra = Rr( () => {
        if (ce && ze.current) {
            let A = j.length - 1
              , Ne = T ? ze.current.offsetWidth : ze.current.offsetHeight
              , _e = Q[0].current ? T ? Q[0].current.offsetLeft : Q[0].current.offsetTop : 0
              , sr = (Q[A].current ? T ? Q[A].current.offsetLeft + Q[A].current.offsetWidth : Q[A].current.offsetTop + Q[A].current.offsetHeight : 0) - _e + g
              , Vr = Q[0].current ? T ? Q[0].current.offsetWidth : Q[0].current.offsetHeight : 0
              , wt = Q[0].current ? Q[0].current.offsetWidth : 0
              , xt = Q[0].current ? Q[0].current.offsetHeight : 0
              , yt = T ? Math.max(document.documentElement.clientWidth || 0, F.innerWidth || 0, ze.current.offsetWidth) : Math.max(document.documentElement.clientHeight || 0, F.innerHeight || 0, ze.current.offsetHeight);
            Ka({
                parent: Ne,
                children: sr,
                item: Vr,
                itemWidth: wt,
                itemHeight: xt,
                viewportLength: yt
            })
        }
    }
    , [ce])
      , ta = Rr( () => {
        At.read(ra)
    }
    , [ra]);
    vt( () => {
        ce && ta()
    }
    , [ce, Y]);
    let dt = X(!0);
    oe( () => rt(ze.current, ({contentSize: A}) => {
        !dt.current && (A.width || A.height) && (ta(),
        $t(!0)),
        dt.current = !1
    }
    ), []),
    oe( () => {
        if (ar) {
            let A = setTimeout( () => $t(!1), 500);
            return () => clearTimeout(A)
        }
    }
    , [ar]);
    let nr = j?.length
      , qr = K ? 0 : Z?.children
      , ht = Z?.item + g
      , tn = s * ht
      , [Pe,vr] = fe(s + nr)
      , [an,aa] = fe(!1)
      , na = X(null)
      , nn = Ar(na)
      , ia = Za() && nn
      , oa = je ? 1 : -1
      , ir = Sr(qr)
      , sa = T ? -s * (Z?.itemWidth + g) : -s * (Z?.itemHeight + g)
      , gt = () => oa * Pe * ht
      , ut = K ? 0 : Ae(ir, A => {
        let Ne = We(-qr, -qr * 2, A);
        return isNaN(Ne) ? 0 : Ne
    }
    )
      , on = We(0, nr, Pe)
      , sn = We(0, -nr, Pe);
    vt( () => {
        Z?.children !== null && !dt.current && ar && ir.set(gt())
    }
    , [Z, qr, oa, tn, Pe, ht, ar]);
    let la = () => {
        K || !ce || !Z.parent || an || (ir.get() !== gt() && St(ir, gt(), x),
        p && en && (ft.current = setTimeout( () => {
            vr(Pe + 1),
            la()
        }
        , E * 1e3)))
    }
      , or = A => {
        vr(je ? Pe - A : Pe + A)
    }
      , ln = A => {
        let Ne = We(0, nr, Pe)
          , _e = We(0, -nr, Pe)
          , Be = A - Ne
          , sr = A - Math.abs(_e);
        vr(je ? Pe - sr : Pe + Be)
    }
      , mn = () => {
        aa(!0)
    }
      , cn = (A, {offset: Ne, velocity: _e}) => {
        aa(!1);
        let Be = T ? Ne.x : Ne.y
          , sr = 200
          , Vr = T ? _e.x : _e.y
          , wt = Be < -Z.item / 2
          , xt = Be > Z.item / 2
          , yt = Math.abs(Be)
          , Ur = Math.round(yt / Z.item)
          , pa = Ur === 0 ? 1 : Ur;
        Vr > sr ? or(-pa) : Vr < -sr ? or(pa) : (wt && or(Ur),
        xt && or(-Ur))
    }
    ;
    oe( () => {
        if (!(!ia || ar))
            return la(),
            () => ft.current && clearTimeout(ft.current)
    }
    , [pt, ia, ar]);
    let fn = 0
      , ma = `calc(${100 / Y}% - ${g}px + ${g / Y}px)`;
    for (let A = 0; A < ea; A++)
        pt.push(...er.map(j, (Ne, _e) => {
            let Be;
            return _e === 0 && (Be = Q[0]),
            _e === j.length - 1 && (Be = Q[1]),
            e(xi, {
                ref: Q[_e],
                slideKey: A + _e + "lg",
                index: A,
                width: T && Y > 1 ? ma : "100%",
                height: T ? "100%" : Y > 1 ? ma : "100%",
                size: Z,
                child: Ne,
                numChildren: j?.length,
                wrappedValue: ut,
                childCounter: fn++,
                gap: g,
                isCanvas: K,
                isHorizontal: T,
                effectsOpacity: y,
                effectsScale: V,
                effectsRotate: ie,
                children: A + _e
            }, A + _e + "lg")
        }
        ));
    let pn = T ? "to right" : "to bottom"
      , ca = Ee / 2
      , dn = 100 - Ee / 2
      , hn = wi(Te, 0, ca)
      , gn = 100 - Te
      , bt = `linear-gradient(${pn}, rgba(0, 0, 0, ${ue}) ${hn}%, rgba(0, 0, 0, 1) ${ca}%, rgba(0, 0, 0, 1) ${dn}%, rgba(0, 0, 0, ${ue}) ${gn}%)`
      , _t = []
      , jr = {};
    if (Zr) {
        for (let A = 0; A < j?.length; A++)
            _t.push(e(yi, {
                dotStyle: {
                    ...ki,
                    width: le,
                    height: le,
                    backgroundColor: ct
                },
                buttonStyle: Et,
                selectedOpacity: z,
                opacity: B,
                onClick: () => ln(A),
                wrappedIndex: on,
                wrappedIndexInverted: sn,
                total: nr,
                index: A,
                gap: mt,
                padding: lt,
                isHorizontal: T,
                isInverted: je
            }, A));
        Ce > 0 && (jr.backdropFilter = jr.WebkitBackdropFilter = jr.MozBackdropFilter = `blur(${Ce}px)`)
    }
    let un = h ? {
        drag: T ? "x" : "y",
        onDragStart: mn,
        onDragEnd: cn,
        dragDirectionLock: !0,
        values: {
            x: ir,
            y: ir
        },
        dragMomentum: !1
    } : {}
      , bn = te === "top-left" || te === "top-mid" || te === "top-right"
      , _n = te === "bottom-left" || te === "bottom-mid" || te === "bottom-right"
      , wn = te === "top-left" || te === "bottom-left"
      , xn = te === "top-right" || te === "bottom-right"
      , fa = te === "top-mid" || te === "bottom-mid" || te === "auto";
    return b("section", {
        style: {
            ...Xa,
            padding: me,
            WebkitMaskImage: ee ? bt : void 0,
            MozMaskImage: ee ? bt : void 0,
            maskImage: ee ? bt : void 0,
            opacity: Z?.item !== null ? 1 : It,
            userSelect: "none"
        },
        onMouseEnter: () => {
            Gt(!0),
            t || Qt(!1)
        }
        ,
        onMouseLeave: () => {
            Gt(!1),
            t || Qt(!0)
        }
        ,
        onMouseDown: A => {
            A.preventDefault(),
            Kt(!0)
        }
        ,
        onMouseUp: () => Kt(!1),
        ref: na,
        children: [e("div", {
            style: {
                width: "100%",
                height: "100%",
                margin: 0,
                padding: "inherit",
                position: "absolute",
                inset: 0,
                overflow: Ke ? "visible" : "hidden",
                borderRadius: M,
                userSelect: "none",
                perspective: K ? "none" : ke
            },
            children: e(O.ul, {
                ref: ze,
                ...un,
                style: {
                    ...Xa,
                    gap: g,
                    placeItems: k,
                    x: T ? K ? sa : ut : 0,
                    y: T ? 0 : K ? sa : ut,
                    flexDirection: T ? "row" : "column",
                    transformStyle: ie !== 0 && !K ? "preserve-3d" : void 0,
                    cursor: h ? rn ? "grabbing" : "grab" : "auto",
                    userSelect: "none",
                    ...I
                },
                children: pt
            })
        }), b("fieldset", {
            style: {
                ..._i
            },
            "aria-label": "Slideshow pagination controls",
            className: "framer--slideshow-controls",
            children: [b(O.div, {
                style: {
                    position: "absolute",
                    display: "flex",
                    flexDirection: T ? "row" : "column",
                    justifyContent: He ? "space-between" : "center",
                    gap: He ? "unset" : _r,
                    opacity: br ? It : 1,
                    alignItems: "center",
                    inset: ae,
                    top: He ? ae : bn ? wr : "unset",
                    left: He ? ae : wn ? Wr : fa ? 0 : "unset",
                    right: He ? ae : xn ? tr : fa ? 0 : "unset",
                    bottom: He ? ae : _n ? xr : "unset"
                },
                animate: br && {
                    opacity: $a ? 1 : It
                },
                transition: x,
                children: [e(O.button, {
                    type: "button",
                    style: {
                        ...Et,
                        backgroundColor: gr,
                        width: re,
                        height: re,
                        borderRadius: Br,
                        rotate: T ? 0 : 90,
                        display: be ? "block" : "none",
                        pointerEvents: "auto"
                    },
                    onClick: () => or(-1),
                    "aria-label": "Previous",
                    whileTap: {
                        scale: .9
                    },
                    transition: {
                        duration: .15
                    },
                    children: e("img", {
                        decoding: "async",
                        width: re,
                        height: re,
                        src: ur || "./framerusercontent.com/images/6tTbkXggWgQCAJ4DO2QEdXXmgM.svg",
                        alt: "Back Arrow"
                    })
                }), e(O.button, {
                    type: "button",
                    style: {
                        ...Et,
                        backgroundColor: gr,
                        width: re,
                        height: re,
                        borderRadius: Br,
                        rotate: T ? 0 : 90,
                        display: be ? "block" : "none",
                        pointerEvents: "auto"
                    },
                    onClick: () => or(1),
                    "aria-label": "Next",
                    whileTap: {
                        scale: .9
                    },
                    transition: {
                        duration: .15
                    },
                    children: e("img", {
                        decoding: "async",
                        width: re,
                        height: re,
                        src: $e || "./framerusercontent.com/images/11KSGbIZoRSg4pjdnUoif6MKHI.svg",
                        alt: "Next Arrow"
                    })
                })]
            }), _t.length > 1 ? e("div", {
                style: {
                    ...vi,
                    left: T ? "50%" : Xr,
                    top: T ? "unset" : "50%",
                    transform: T ? "translateX(-50%)" : "translateY(-50%)",
                    flexDirection: T ? "row" : "column",
                    bottom: T ? Xr : "unset",
                    borderRadius: Mr,
                    backgroundColor: yr,
                    userSelect: "none",
                    ...jr
                },
                children: _t
            }) : null]
        })]
    })
}
U.defaultProps = {
    direction: "left",
    dragControl: !1,
    startFrom: 0,
    itemAmount: 1,
    infinity: !0,
    gap: 10,
    padding: 10,
    autoPlayControl: !0,
    effectsOptions: {
        effectsOpacity: 1,
        effectsScale: 1,
        effectsRotate: 0,
        effectsPerspective: 1200,
        effectsHover: !0
    },
    transitionControl: {
        type: "spring",
        stiffness: 200,
        damping: 40
    },
    fadeOptions: {
        fadeContent: !1,
        overflow: !1,
        fadeWidth: 25,
        fadeAlpha: 0,
        fadeInset: 0
    },
    arrowOptions: {
        showMouseControls: !0,
        arrowShouldFadeIn: !1,
        arrowShouldSpace: !0,
        arrowFill: "rgba(0,0,0,0.2)",
        arrowSize: 40
    },
    progressOptions: {
        showProgressDots: !0
    }
};
Oe(U, {
    slots: {
        type: c.Array,
        title: "Content",
        control: {
            type: c.ComponentInstance
        }
    },
    direction: {
        type: c.Enum,
        title: "Direction",
        options: ["left", "right", "top", "bottom"],
        optionIcons: ["direction-left", "direction-right", "direction-up", "direction-down"],
        optionTitles: ["Left", "Right", "Top", "Bottom"],
        displaySegmentedControl: !0,
        defaultValue: U.defaultProps.direction
    },
    autoPlayControl: {
        type: c.Boolean,
        title: "Auto Play",
        defaultValue: !0
    },
    intervalControl: {
        type: c.Number,
        title: "Interval",
        defaultValue: 1.5,
        min: .5,
        max: 10,
        step: .1,
        displayStepper: !0,
        unit: "s",
        hidden: r => !r.autoPlayControl
    },
    dragControl: {
        type: c.Boolean,
        title: "Draggable",
        defaultValue: !1
    },
    startFrom: {
        type: c.Number,
        title: "Current",
        min: 0,
        max: 10,
        displayStepper: !0,
        defaultValue: U.defaultProps.startFrom
    },
    effectsOptions: {
        type: c.Object,
        title: "Effects",
        controls: {
            effectsOpacity: {
                type: c.Number,
                title: "Opacity",
                defaultValue: U.defaultProps.effectsOptions.effectsOpacity,
                min: 0,
                max: 1,
                step: .01,
                displayStepper: !0
            },
            effectsScale: {
                type: c.Number,
                title: "Scale",
                defaultValue: U.defaultProps.effectsOptions.effectsScale,
                min: 0,
                max: 1,
                step: .01,
                displayStepper: !0
            },
            effectsPerspective: {
                type: c.Number,
                title: "Perspective",
                defaultValue: U.defaultProps.effectsOptions.effectsPerspective,
                min: 200,
                max: 2e3,
                step: 1
            },
            effectsRotate: {
                type: c.Number,
                title: "Rotate",
                defaultValue: U.defaultProps.effectsOptions.effectsRotate,
                min: -180,
                max: 180,
                step: 1
            },
            effectsHover: {
                type: c.Boolean,
                title: "On Hover",
                enabledTitle: "Play",
                disabledTitle: "Pause",
                defaultValue: U.defaultProps.effectsOptions.effectsHover
            }
        }
    },
    alignment: {
        type: c.Enum,
        title: "Align",
        options: ["flex-start", "center", "flex-end"],
        optionIcons: {
            direction: {
                right: ["align-top", "align-middle", "align-bottom"],
                left: ["align-top", "align-middle", "align-bottom"],
                top: ["align-left", "align-center", "align-right"],
                bottom: ["align-left", "align-center", "align-right"]
            }
        },
        defaultValue: "center",
        displaySegmentedControl: !0
    },
    itemAmount: {
        type: c.Number,
        title: "Items",
        min: 1,
        max: 10,
        displayStepper: !0,
        defaultValue: U.defaultProps.itemAmount
    },
    gap: {
        type: c.Number,
        title: "Gap",
        min: 0
    },
    padding: {
        title: "Padding",
        type: c.FusedNumber,
        toggleKey: "paddingPerSide",
        toggleTitles: ["Padding", "Padding per side"],
        defaultValue: 0,
        valueKeys: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"],
        valueLabels: ["T", "R", "B", "L"],
        min: 0
    },
    borderRadius: {
        type: c.Number,
        title: "Radius",
        min: 0,
        max: 500,
        displayStepper: !0,
        defaultValue: 0
    },
    transitionControl: {
        type: c.Transition,
        defaultValue: U.defaultProps.transitionControl,
        title: "Transition"
    },
    fadeOptions: {
        type: c.Object,
        title: "Clipping",
        controls: {
            fadeContent: {
                type: c.Boolean,
                title: "Fade",
                defaultValue: !1
            },
            overflow: {
                type: c.Boolean,
                title: "Overflow",
                enabledTitle: "Show",
                disabledTitle: "Hide",
                defaultValue: !1,
                hidden(r) {
                    return r.fadeContent === !0
                }
            },
            fadeWidth: {
                type: c.Number,
                title: "Width",
                defaultValue: 25,
                min: 0,
                max: 100,
                unit: "%",
                hidden(r) {
                    return r.fadeContent === !1
                }
            },
            fadeInset: {
                type: c.Number,
                title: "Inset",
                defaultValue: 0,
                min: 0,
                max: 100,
                unit: "%",
                hidden(r) {
                    return r.fadeContent === !1
                }
            },
            fadeAlpha: {
                type: c.Number,
                title: "Opacity",
                defaultValue: 0,
                min: 0,
                max: 1,
                step: .05,
                hidden(r) {
                    return r.fadeContent === !1
                }
            }
        }
    },
    arrowOptions: {
        type: c.Object,
        title: "Arrows",
        controls: {
            showMouseControls: {
                type: c.Boolean,
                title: "Show",
                defaultValue: U.defaultProps.arrowOptions.showMouseControls
            },
            arrowFill: {
                type: c.Color,
                title: "Fill",
                hidden: r => !r.showMouseControls,
                defaultValue: U.defaultProps.arrowOptions.arrowFill
            },
            leftArrow: {
                type: c.Image,
                title: "Previous",
                hidden: r => !r.showMouseControls
            },
            rightArrow: {
                type: c.Image,
                title: "Next",
                hidden: r => !r.showMouseControls
            },
            arrowSize: {
                type: c.Number,
                title: "Size",
                min: 0,
                max: 200,
                displayStepper: !0,
                defaultValue: U.defaultProps.arrowOptions.arrowSize,
                hidden: r => !r.showMouseControls
            },
            arrowRadius: {
                type: c.Number,
                title: "Radius",
                min: 0,
                max: 500,
                defaultValue: 40,
                hidden: r => !r.showMouseControls
            },
            arrowShouldFadeIn: {
                type: c.Boolean,
                title: "Fade In",
                defaultValue: !1,
                hidden: r => !r.showMouseControls
            },
            arrowShouldSpace: {
                type: c.Boolean,
                title: "Distance",
                enabledTitle: "Space",
                disabledTitle: "Group",
                defaultValue: U.defaultProps.arrowOptions.arrowShouldSpace,
                hidden: r => !r.showMouseControls
            },
            arrowPosition: {
                type: c.Enum,
                title: "Position",
                options: ["auto", "top-left", "top-mid", "top-right", "bottom-left", "bottom-mid", "bottom-right"],
                optionTitles: ["Center", "Top Left", "Top Middle", "Top Right", "Bottom Left", "Bottom Middle", "Bottom Right"],
                hidden: r => !r.showMouseControls || r.arrowShouldSpace
            },
            arrowPadding: {
                type: c.Number,
                title: "Inset",
                min: -100,
                max: 100,
                defaultValue: 20,
                displayStepper: !0,
                hidden: r => !r.showMouseControls || !r.arrowShouldSpace
            },
            arrowPaddingTop: {
                type: c.Number,
                title: "Top",
                min: -500,
                max: 500,
                defaultValue: 0,
                displayStepper: !0,
                hidden: r => !r.showMouseControls || r.arrowShouldSpace || r.arrowPosition === "auto" || r.arrowPosition === "bottom-mid" || r.arrowPosition === "bottom-left" || r.arrowPosition === "bottom-right"
            },
            arrowPaddingBottom: {
                type: c.Number,
                title: "Bottom",
                min: -500,
                max: 500,
                defaultValue: 0,
                displayStepper: !0,
                hidden: r => !r.showMouseControls || r.arrowShouldSpace || r.arrowPosition === "auto" || r.arrowPosition === "top-mid" || r.arrowPosition === "top-left" || r.arrowPosition === "top-right"
            },
            arrowPaddingRight: {
                type: c.Number,
                title: "Right",
                min: -500,
                max: 500,
                defaultValue: 0,
                displayStepper: !0,
                hidden: r => !r.showMouseControls || r.arrowShouldSpace || r.arrowPosition === "auto" || r.arrowPosition === "top-left" || r.arrowPosition === "top-mid" || r.arrowPosition === "bottom-left" || r.arrowPosition === "bottom-mid"
            },
            arrowPaddingLeft: {
                type: c.Number,
                title: "Left",
                min: -500,
                max: 500,
                defaultValue: 0,
                displayStepper: !0,
                hidden: r => !r.showMouseControls || r.arrowShouldSpace || r.arrowPosition === "auto" || r.arrowPosition === "top-right" || r.arrowPosition === "top-mid" || r.arrowPosition === "bottom-right" || r.arrowPosition === "bottom-mid"
            },
            arrowGap: {
                type: c.Number,
                title: "Gap",
                min: 0,
                max: 100,
                defaultValue: 10,
                displayStepper: !0,
                hidden: r => !r.showMouseControls || r.arrowShouldSpace
            }
        }
    },
    progressOptions: {
        type: c.Object,
        title: "Dots",
        controls: {
            showProgressDots: {
                type: c.Boolean,
                title: "Show",
                defaultValue: !1
            },
            dotSize: {
                type: c.Number,
                title: "Size",
                min: 1,
                max: 100,
                defaultValue: 10,
                displayStepper: !0,
                hidden: r => !r.showProgressDots || r.showScrollbar
            },
            dotsInset: {
                type: c.Number,
                title: "Inset",
                min: -100,
                max: 100,
                defaultValue: 10,
                displayStepper: !0,
                hidden: r => !r.showProgressDots || r.showScrollbar
            },
            dotsGap: {
                type: c.Number,
                title: "Gap",
                min: 0,
                max: 100,
                defaultValue: 10,
                displayStepper: !0,
                hidden: r => !r.showProgressDots || r.showScrollbar
            },
            dotsPadding: {
                type: c.Number,
                title: "Padding",
                min: 0,
                max: 100,
                defaultValue: 10,
                displayStepper: !0,
                hidden: r => !r.showProgressDots || r.showScrollbar
            },
            dotsFill: {
                type: c.Color,
                title: "Fill",
                defaultValue: "#fff",
                hidden: r => !r.showProgressDots || r.showScrollbar
            },
            dotsBackground: {
                type: c.Color,
                title: "Backdrop",
                defaultValue: "rgba(0,0,0,0.2)",
                hidden: r => !r.showProgressDots || r.showScrollbar
            },
            dotsRadius: {
                type: c.Number,
                title: "Radius",
                min: 0,
                max: 200,
                defaultValue: 50,
                hidden: r => !r.showProgressDots || r.showScrollbar
            },
            dotsOpacity: {
                type: c.Number,
                title: "Opacity",
                min: 0,
                max: 1,
                defaultValue: .5,
                step: .1,
                displayStepper: !0,
                hidden: r => !r.showProgressDots || r.showScrollbar
            },
            dotsActiveOpacity: {
                type: c.Number,
                title: "Current",
                min: 0,
                max: 1,
                defaultValue: 1,
                step: .1,
                displayStepper: !0,
                hidden: r => !r.showProgressDots || r.showScrollbar
            },
            dotsBlur: {
                type: c.Number,
                title: "Blur",
                min: 0,
                max: 50,
                defaultValue: 0,
                step: 1,
                hidden: r => !r.showProgressDots || r.showScrollbar
            }
        }
    }
});
var Xa = {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
    placeItems: "center",
    margin: 0,
    padding: 0,
    listStyleType: "none",
    textIndent: "none"
}
  , hi = {
    display: "flex",
    width: "100%",
    height: "100%",
    placeContent: "center",
    placeItems: "center",
    flexDirection: "column",
    color: "#96F",
    background: "rgba(136, 85, 255, 0.1)",
    fontSize: 11,
    overflow: "hidden",
    padding: "20px 20px 30px 20px"
}
  , gi = {
    fontSize: 32,
    marginBottom: 10
}
  , ui = {
    margin: 0,
    marginBottom: 10,
    fontWeight: 600,
    textAlign: "center"
}
  , bi = {
    margin: 0,
    opacity: .7,
    maxWidth: 180,
    lineHeight: 1.5,
    textAlign: "center"
}
  , Et = {
    border: "none",
    display: "flex",
    placeContent: "center",
    placeItems: "center",
    overflow: "hidden",
    background: "transparent",
    cursor: "pointer",
    margin: 0,
    padding: 0
}
  , _i = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    pointerEvents: "none",
    userSelect: "none",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    border: 0,
    padding: 0,
    margin: 0
}
  , wi = (r, i, s) => Math.min(Math.max(r, i), s)
  , xi = Re(function(i, s) {
    var o, m;
    let {slideKey: p, width: h, height: k, child: g, size: n, gap: _, wrappedValue: w, numChildren: L, childCounter: u, isCanvas: v, effects: Y, effectsOpacity: C, effectsScale: E, effectsRotate: x, isHorizontal: H, isLast: M, index: q} = i
      , I = (n?.item + _) * u
      , y = [-n?.item, 0, n?.parent - n?.item + _, n?.parent].map(Te => Te - I)
      , V = !v && Ae(w, y, [-x, 0, 0, x])
      , ie = !v && Ae(w, y, [x, 0, 0, -x])
      , ke = !v && Ae(w, y, [C, 1, 1, C])
      , t = !v && Ae(w, y, [E, 1, 1, E])
      , ee = !v && Ae(w, y, [1, 1, 0, 0])
      , Ke = !v && Ae(w, Te => Te >= y[1] && Te <= y[2]);
    oe( () => {
        if (Ke)
            return Ke.onChange(Te => {
                var ue;
                (ue = s.current) === null || ue === void 0 || ue.setAttribute("aria-hidden", !Te)
            }
            )
    }
    , []);
    let Ee = v ? "visible" : Ae(w, [y[0] - n.viewportLength, kt(y[1], y[2], .5), y[3] + n.viewportLength], ["hidden", "visible", "hidden"]);
    return e(pe, {
        inherit: "id",
        children: e("li", {
            style: {
                display: "contents"
            },
            "aria-hidden": q !== 0,
            children: kr(g, {
                ref: s,
                key: p + "child",
                style: {
                    ...(o = g.props) === null || o === void 0 ? void 0 : o.style,
                    flexShrink: 0,
                    userSelect: "none",
                    width: h,
                    height: k,
                    opacity: ke,
                    scale: t,
                    originX: H ? ee : .5,
                    originY: H ? .5 : ee,
                    rotateY: H ? V : 0,
                    rotateX: H ? 0 : ie,
                    visibility: Ee
                },
                layoutId: g.props.layoutId ? g.props.layoutId + "-original-" + q : void 0
            }, (m = g.props) === null || m === void 0 ? void 0 : m.children)
        })
    })
});
function yi({selectedOpacity: r, opacity: i, total: s, index: o, wrappedIndex: m, wrappedIndexInverted: p, dotStyle: h, buttonStyle: k, gap: g, padding: n, isHorizontal: _, isInverted: w, ...L}) {
    let u = m === o;
    w && (u = Math.abs(p) === o);
    let v = g / 2
      , Y = !_ && o > 0 ? v : n
      , C = !_ && o !== s - 1 ? v : n
      , E = _ && o !== s - 1 ? v : n
      , x = _ && o > 0 ? v : n;
    return e("button", {
        "aria-label": `Scroll to page ${o + 1}`,
        type: "button",
        ...L,
        style: {
            ...k,
            padding: `${Y}px ${E}px ${C}px ${x}px`
        },
        children: e(O.div, {
            style: {
                ...h
            },
            initial: !1,
            animate: {
                opacity: u ? r : i
            },
            transition: {
                duration: .3
            }
        })
    })
}
var vi = {
    display: "flex",
    placeContent: "center",
    placeItems: "center",
    overflow: "hidden",
    position: "absolute",
    pointerEvents: "auto"
}
  , ki = {
    borderRadius: "50%",
    background: "white",
    cursor: "pointer",
    border: "none",
    placeContent: "center",
    placeItems: "center",
    padding: 0
};
var Ci = ["NjvQ1dvg2", "yt2yRgvlL"]
  , Ri = "framer-P9isK"
  , Si = {
    NjvQ1dvg2: "framer-v-7bv7z0",
    yt2yRgvlL: "framer-v-1me5dzm"
};
function Ai(r, ...i) {
    let s = {};
    return i?.forEach(o => o && Object.assign(s, r[o])),
    s
}
var Oi = {
    bounce: .2,
    delay: 0,
    duration: .4,
    type: "spring"
}
  , Yi = ({value: r, children: i}) => {
    let s = lr(Ie)
      , o = r ?? s.transition
      , m = Se( () => ({
        ...s,
        transition: o
    }), [JSON.stringify(o)]);
    return e(Ie.Provider, {
        value: m,
        children: i
    })
}
  , Li = O.create(a)
  , Ti = {
    "Variant 1": "NjvQ1dvg2",
    "Variant 2": "yt2yRgvlL"
}
  , Pi = ({height: r, id: i, width: s, ...o}) => {
    var m, p;
    return {
        ...o,
        variant: (p = (m = Ti[o.variant]) !== null && m !== void 0 ? m : o.variant) !== null && p !== void 0 ? p : "NjvQ1dvg2"
    }
}
  , Ni = (r, i) => r.layoutDependency ? i.join("-") + r.layoutDependency : i.join("-")
  , Fi = Re(function(r, i) {
    let {activeLocale: s, setLocale: o} = De()
      , {style: m, className: p, layoutId: h, variant: k, ...g} = Pi(r)
      , {baseVariant: n, classNames: _, clearLoadingGesture: w, gestureHandlers: L, gestureVariant: u, isLoading: v, setGestureState: Y, setVariant: C, variants: E} = fr({
        cycleOrder: Ci,
        defaultVariant: "NjvQ1dvg2",
        variant: k,
        variantClassNames: Si
    })
      , x = Ni(r, E)
      , H = X(null)
      , M = Ve()
      , q = []
      , I = mr();
    return e(pe, {
        id: h ?? M,
        children: e(Li, {
            animate: E,
            initial: !1,
            children: e(Yi, {
                value: Oi,
                children: e($, {
                    ...g,
                    ...L,
                    background: {
                        alt: "",
                        fit: "fill",
                        intrinsicHeight: 1200,
                        intrinsicWidth: 1200,
                        loading: R(I?.y || 0),
                        pixelHeight: 1200,
                        pixelWidth: 1200,
                        src: "./framerusercontent.com/images/hyperevm.png",
                    },
                    className: Xe(Ri, ...q, "framer-7bv7z0", p, _),
                    "data-framer-name": "Variant 1",
                    layoutDependency: x,
                    layoutId: "NjvQ1dvg2",
                    ref: i ?? H,
                    style: {
                        ...m
                    },
                    ...Ai({
                        yt2yRgvlL: {
                            "data-framer-name": "Variant 2"
                        }
                    }, n, u)
                })
            })
        })
    })
})
  , Hi = ["@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }", ".framer-P9isK.framer-1y04gt9, .framer-P9isK .framer-1y04gt9 { display: block; }", ".framer-P9isK.framer-7bv7z0 { height: 400px; overflow: visible; position: relative; width: 400px; }", ".framer-P9isK.framer-v-1me5dzm.framer-7bv7z0 { aspect-ratio: 1 / 1; height: var(--framer-aspect-ratio-supported, 40px); width: 40px; }"]
  , Tr = Je(Fi, Hi, "framer-P9isK")
  , rr = Tr;
Tr.displayName = "Blob-light";
Tr.defaultProps = {
    height: 400,
    width: 400
};
Oe(Tr, {
    variant: {
        options: ["NjvQ1dvg2", "yt2yRgvlL"],
        optionTitles: ["Variant 1", "Variant 2"],
        title: "Variant",
        type: c.Enum
    }
});
Ge(Tr, [{
    explicitInter: !0,
    fonts: []
}], {
    supportsExplicitInterCodegen: !0
});
var zt = Me(O.div)
  , Ii = Me($)
  , de = Jr(Me($))
  , Ei = qe(rr)
  , zi = ["HQlUbiSz0", "DS0xI1e0I", "XkiAMa1YK", "LRhSYb0jR"]
  , Bi = "framer-s9Bp5"
  , Wi = {
    DS0xI1e0I: "framer-v-1wwnioy",
    HQlUbiSz0: "framer-v-br0or5",
    LRhSYb0jR: "framer-v-166zujf",
    XkiAMa1YK: "framer-v-1w83hf2"
};
function G(r, ...i) {
    let s = {};
    return i?.forEach(o => o && Object.assign(s, r[o])),
    s
}
var Zi = {
    bounce: .2,
    delay: 0,
    duration: .4,
    type: "spring"
}
  , at = {
    delay: 0,
    duration: 2.4,
    ease: [.44, 0, .56, 1],
    type: "tween"
}
  , Pr = {
    opacity: 0,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0,
    x: 0,
    y: 0
}
  , Xi = {
    delay: 1.2,
    duration: 1.2,
    ease: [.15, .45, .15, 1.35],
    type: "tween"
}
  , he = {
    opacity: 1,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0,
    transition: Xi,
    x: 0,
    y: 0
}
  , hr = {
    opacity: .001,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0,
    x: 0,
    y: 0
}
  , Ma = {
    opacity: .001,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1.04,
    skewX: 4,
    skewY: 0,
    x: -16,
    y: -16
}
  , qa = {
    opacity: .001,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1.04,
    skewX: -4,
    skewY: 0,
    x: 16,
    y: -16
}
  , ja = {
    opacity: .001,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1.2,
    skewX: 0,
    skewY: 0,
    x: 0,
    y: 0
}
  , Va = {
    delay: 0,
    duration: 1.2,
    ease: [.44, 0, .56, 1],
    type: "tween"
}
  , Bt = (r, i) => `translate(-50%, -50%) ${i}`
  , Ua = {
    opacity: .001,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1.2,
    skewX: 0,
    skewY: 0,
    x: 0,
    y: -10
}
  , Mi = {
    opacity: 1,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 2.4,
    skewX: 0,
    skewY: 0,
    x: 0,
    y: 0
}
  , qi = ({value: r, children: i}) => {
    let s = lr(Ie)
      , o = r ?? s.transition
      , m = Se( () => ({
        ...s,
        transition: o
    }), [JSON.stringify(o)]);
    return e(Ie.Provider, {
        value: m,
        children: i
    })
}
  , ji = O.create(a)
  , Vi = {
    HLiquina_m: "LRhSYb0jR",
    HLiquina: "XkiAMa1YK",
    Liquina_m: "DS0xI1e0I",
    Liquina: "HQlUbiSz0"
}
  , Ui = ({height: r, id: i, width: s, ...o}) => {
    var m, p;
    return {
        ...o,
        variant: (p = (m = Vi[o.variant]) !== null && m !== void 0 ? m : o.variant) !== null && p !== void 0 ? p : "HQlUbiSz0"
    }
}
  , Di = (r, i) => r.layoutDependency ? i.join("-") + r.layoutDependency : i.join("-")
  , Ji = Re(function(r, i) {
    let {activeLocale: s, setLocale: o} = De()
      , {style: m, className: p, layoutId: h, variant: k, ...g} = Ui(r)
      , {baseVariant: n, classNames: _, clearLoadingGesture: w, gestureHandlers: L, gestureVariant: u, isLoading: v, setGestureState: Y, setVariant: C, variants: E} = fr({
        cycleOrder: zi,
        defaultVariant: "HQlUbiSz0",
        variant: k,
        variantClassNames: Wi
    })
      , x = Di(r, E)
      , {activeVariantCallback: H, delay: M} = ua(n)
      , q = H(async (...ee) => {
        await M( () => C("XkiAMa1YK"), 4800)
    }
    )
      , I = H(async (...ee) => {
        await M( () => C("LRhSYb0jR"), 4800)
    }
    );
    _a(n, {
        default: q,
        DS0xI1e0I: I,
        LRhSYb0jR: void 0,
        XkiAMa1YK: void 0
    });
    let y = X(null)
      , V = () => !!["XkiAMa1YK", "LRhSYb0jR"].includes(n)
      , ie = Ve()
      , ke = []
      , t = mr();
    return e(pe, {
        id: h ?? ie,
        children: e(ji, {
            animate: E,
            initial: !1,
            children: e(qi, {
                value: Zi,
                children: b(O.div, {
                    ...g,
                    ...L,
                    className: Xe(Bi, ...ke, "framer-br0or5", p, _),
                    "data-framer-name": "Liquina",
                    "data-highlight": !0,
                    layoutDependency: x,
                    layoutId: "HQlUbiSz0",
                    ref: i ?? y,
                    style: {
                        ...m
                    },
                    ...G({
                        DS0xI1e0I: {
                            "data-framer-name": "Liquina_m"
                        },
                        LRhSYb0jR: {
                            "data-framer-name": "HLiquina_m",
                            "data-highlight": void 0
                        },
                        XkiAMa1YK: {
                            "data-framer-name": "HLiquina",
                            "data-highlight": void 0
                        }
                    }, n, u),
                    children: [e(zt, {
                        __framer__loop: Pr,
                        __framer__loopEffectEnabled: !0,
                        __framer__loopRepeatDelay: .4,
                        __framer__loopRepeatType: "mirror",
                        __framer__loopTransition: at,
                        __perspectiveFX: !1,
                        __smartComponentFX: !0,
                        __targetOpacity: 1,
                        className: "framer-1o0hmnp",
                        layoutDependency: x,
                        layoutId: "Ta6XtJwLj",
                        style: {
                            background: "radial-gradient(50% 50% at 50% 50%, rgb(150, 252, 229) 30.91920045045045%, rgba(150, 252, 229, 0.24) 61.27885698198199%, rgba(150, 252, 229, 0) 100%)"
                        }
                    }), e($, {
                        background: {
                            alt: "",
                            intrinsicHeight: 2821,
                            intrinsicWidth: 2500,
                            loading: R((t?.y || 0) + -80),
                            pixelHeight: 2031,
                            pixelWidth: 1800,
                            positionX: "center",
                            positionY: "center",
                            sizes: `calc(${t?.width || "100vw"} + 336px)`,
                            src: "./framerusercontent.com/images/Zt8QbQpTq6kIN9qGprAw0vcVZE.png",
                            srcSet: "./framerusercontent.com/images/Zt8QbQpTq6kIN9qGprAw0vcVZE.png?scale-down-to=1024 907w,./framerusercontent.com/images/Zt8QbQpTq6kIN9qGprAw0vcVZE.png 1800w"
                        },
                        className: "framer-1i8oab9",
                        "data-framer-name": "Liquina_Dark",
                        layoutDependency: x,
                        layoutId: "uqxNVqnmV",
                        ...G({
                            DS0xI1e0I: {
                                background: {
                                    alt: "",
                                    intrinsicHeight: 2821,
                                    intrinsicWidth: 2500,
                                    loading: R((t?.y || 0) + -40),
                                    pixelHeight: 1219,
                                    pixelWidth: 1080,
                                    positionX: "center",
                                    positionY: "center",
                                    sizes: `calc(${t?.width || "100vw"} + 336px)`,
                                    src: "./framerusercontent.com/images/zSRuAew23CaFEYbHGyIcKEaaYxU.png",
                                    srcSet: "./framerusercontent.com/images/zSRuAew23CaFEYbHGyIcKEaaYxU.png?scale-down-to=1024 907w,./framerusercontent.com/images/zSRuAew23CaFEYbHGyIcKEaaYxU.png 1080w"
                                }
                            },
                            LRhSYb0jR: {
                                background: {
                                    alt: "",
                                    intrinsicHeight: 2821,
                                    intrinsicWidth: 2500,
                                    loading: R((t?.y || 0) + -40),
                                    pixelHeight: 1219,
                                    pixelWidth: 1080,
                                    positionX: "center",
                                    positionY: "center",
                                    sizes: `calc(${t?.width || "100vw"} + 336px)`,
                                    src: "./framerusercontent.com/images/zSRuAew23CaFEYbHGyIcKEaaYxU.png",
                                    srcSet: "./framerusercontent.com/images/zSRuAew23CaFEYbHGyIcKEaaYxU.png?scale-down-to=1024 907w,./framerusercontent.com/images/zSRuAew23CaFEYbHGyIcKEaaYxU.png 1080w"
                                }
                            }
                        }, n, u)
                    }), e(Ii, {
                        __framer__loop: Pr,
                        __framer__loopEffectEnabled: !0,
                        __framer__loopRepeatDelay: .4,
                        __framer__loopRepeatType: "mirror",
                        __framer__loopTransition: at,
                        __perspectiveFX: !1,
                        __smartComponentFX: !0,
                        __targetOpacity: 1,
                        background: {
                            alt: "",
                            fit: "fill",
                            intrinsicHeight: 5049,
                            intrinsicWidth: 4474,
                            loading: R((t?.y || 0) + -80),
                            pixelHeight: 2031,
                            pixelWidth: 1800,
                            sizes: `calc(${t?.width || "100vw"} + 336px)`,
                            src: "./framerusercontent.com/images/bcPlgP6VzWtzWOTDn1JIE7uVNss.png",
                            srcSet: "./framerusercontent.com/images/bcPlgP6VzWtzWOTDn1JIE7uVNss.png?scale-down-to=1024 907w,./framerusercontent.com/images/bcPlgP6VzWtzWOTDn1JIE7uVNss.png 1800w"
                        },
                        className: "framer-1w067yx",
                        "data-framer-name": "Liquina_Light",
                        layoutDependency: x,
                        layoutId: "MpRYR2r0H",
                        ...G({
                            DS0xI1e0I: {
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 5049,
                                    intrinsicWidth: 4474,
                                    loading: R((t?.y || 0) + -40),
                                    pixelHeight: 1219,
                                    pixelWidth: 1080,
                                    sizes: `calc(${t?.width || "100vw"} + 336px)`,
                                    src: "./framerusercontent.com/images/itbbOqCNDRxoREQPuKLCvxa3Txk.png",
                                    srcSet: "./framerusercontent.com/images/itbbOqCNDRxoREQPuKLCvxa3Txk.png?scale-down-to=1024 907w,./framerusercontent.com/images/itbbOqCNDRxoREQPuKLCvxa3Txk.png 1080w"
                                }
                            },
                            LRhSYb0jR: {
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 5049,
                                    intrinsicWidth: 4474,
                                    loading: R((t?.y || 0) + -40),
                                    pixelHeight: 1219,
                                    pixelWidth: 1080,
                                    sizes: `calc(${t?.width || "100vw"} + 336px)`,
                                    src: "./framerusercontent.com/images/itbbOqCNDRxoREQPuKLCvxa3Txk.png",
                                    srcSet: "./framerusercontent.com/images/itbbOqCNDRxoREQPuKLCvxa3Txk.png?scale-down-to=1024 907w,./framerusercontent.com/images/itbbOqCNDRxoREQPuKLCvxa3Txk.png 1080w"
                                }
                            }
                        }, n, u)
                    }), V() && b(O.div, {
                        className: "framer-166hk18",
                        "data-framer-name": "HyperLiquina_Dark",
                        layoutDependency: x,
                        layoutId: "AtybR7PD1",
                        children: [e(de, {
                            __perspectiveFX: !1,
                            __smartComponentFX: !0,
                            __targetOpacity: 1,
                            animate: he,
                            background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 5049,
                                intrinsicWidth: 4474,
                                pixelHeight: 2031,
                                pixelWidth: 1800,
                                src: "./framerusercontent.com/images/dyMDL9jCPpYVxMk1mWAOU77c38.png",
                                srcSet: "./framerusercontent.com/images/dyMDL9jCPpYVxMk1mWAOU77c38.png?scale-down-to=1024 907w,./framerusercontent.com/images/dyMDL9jCPpYVxMk1mWAOU77c38.png 1800w"
                            },
                            className: "framer-1mxemti",
                            "data-framer-appear-id": "1mxemti",
                            "data-framer-name": "HLA dark_body",
                            initial: hr,
                            layoutDependency: x,
                            layoutId: "VwDLlObrZ",
                            optimized: !0,
                            ...G({
                                LRhSYb0jR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 5049,
                                        intrinsicWidth: 4474,
                                        loading: R((t?.y || 0) + -40 + 0),
                                        pixelHeight: 1219,
                                        pixelWidth: 1080,
                                        sizes: `calc(${t?.width || "100vw"} + 336px)`,
                                        src: "./framerusercontent.com/images/40TIp69Wo6j8QBZjFRvtsZcSPs.png",
                                        srcSet: "./framerusercontent.com/images/40TIp69Wo6j8QBZjFRvtsZcSPs.png?scale-down-to=1024 907w,./framerusercontent.com/images/40TIp69Wo6j8QBZjFRvtsZcSPs.png 1080w"
                                    }
                                },
                                XkiAMa1YK: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 5049,
                                        intrinsicWidth: 4474,
                                        loading: R((t?.y || 0) + -80 + 0),
                                        pixelHeight: 2031,
                                        pixelWidth: 1800,
                                        sizes: `calc(${t?.width || "100vw"} + 336px)`,
                                        src: "./framerusercontent.com/images/dyMDL9jCPpYVxMk1mWAOU77c38.png",
                                        srcSet: "./framerusercontent.com/images/dyMDL9jCPpYVxMk1mWAOU77c38.png?scale-down-to=1024 907w,./framerusercontent.com/images/dyMDL9jCPpYVxMk1mWAOU77c38.png 1800w"
                                    }
                                }
                            }, n, u)
                        }), e(de, {
                            __perspectiveFX: !1,
                            __smartComponentFX: !0,
                            __targetOpacity: 1,
                            animate: he,
                            background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 5049,
                                intrinsicWidth: 4474,
                                pixelHeight: 2031,
                                pixelWidth: 1800,
                                src: "./framerusercontent.com/images/On5jBhR9lJO5z6Gbm4QN9lfG5ag.png",
                                srcSet: "./framerusercontent.com/images/On5jBhR9lJO5z6Gbm4QN9lfG5ag.png?scale-down-to=1024 907w,./framerusercontent.com/images/On5jBhR9lJO5z6Gbm4QN9lfG5ag.png 1800w"
                            },
                            className: "framer-okk8um",
                            "data-framer-appear-id": "okk8um",
                            "data-framer-name": "HLA dark_right arm",
                            initial: Ma,
                            layoutDependency: x,
                            layoutId: "bVzhRGhUW",
                            optimized: !0,
                            ...G({
                                LRhSYb0jR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 5049,
                                        intrinsicWidth: 4474,
                                        loading: R((t?.y || 0) + -40 + 0),
                                        pixelHeight: 1219,
                                        pixelWidth: 1080,
                                        sizes: `calc(${t?.width || "100vw"} + 336px)`,
                                        src: "./framerusercontent.com/images/CbFGbpQD5rlBe1hbXh3ECEs8k.png",
                                        srcSet: "./framerusercontent.com/images/CbFGbpQD5rlBe1hbXh3ECEs8k.png?scale-down-to=1024 907w,./framerusercontent.com/images/CbFGbpQD5rlBe1hbXh3ECEs8k.png 1080w"
                                    }
                                },
                                XkiAMa1YK: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 5049,
                                        intrinsicWidth: 4474,
                                        loading: R((t?.y || 0) + -80 + 0),
                                        pixelHeight: 2031,
                                        pixelWidth: 1800,
                                        sizes: `calc(${t?.width || "100vw"} + 336px)`,
                                        src: "./framerusercontent.com/images/On5jBhR9lJO5z6Gbm4QN9lfG5ag.png",
                                        srcSet: "./framerusercontent.com/images/On5jBhR9lJO5z6Gbm4QN9lfG5ag.png?scale-down-to=1024 907w,./framerusercontent.com/images/On5jBhR9lJO5z6Gbm4QN9lfG5ag.png 1800w"
                                    }
                                }
                            }, n, u)
                        }), e(de, {
                            __perspectiveFX: !1,
                            __smartComponentFX: !0,
                            __targetOpacity: 1,
                            animate: he,
                            background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 5049,
                                intrinsicWidth: 4474,
                                pixelHeight: 2031,
                                pixelWidth: 1800,
                                src: "./framerusercontent.com/images/R504WJ9qEToHQTXqWS9pzPNjmCA.png",
                                srcSet: "./framerusercontent.com/images/R504WJ9qEToHQTXqWS9pzPNjmCA.png?scale-down-to=1024 907w,./framerusercontent.com/images/R504WJ9qEToHQTXqWS9pzPNjmCA.png 1800w"
                            },
                            className: "framer-1hqq36p",
                            "data-framer-appear-id": "1hqq36p",
                            "data-framer-name": "HLA dark_left arm",
                            initial: qa,
                            layoutDependency: x,
                            layoutId: "T5hwLu3l3",
                            optimized: !0,
                            ...G({
                                LRhSYb0jR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 5049,
                                        intrinsicWidth: 4474,
                                        loading: R((t?.y || 0) + -40 + -.27813040969397207),
                                        pixelHeight: 1219,
                                        pixelWidth: 1080,
                                        sizes: `calc(${t?.width || "100vw"} + 336px)`,
                                        src: "./framerusercontent.com/images/ZUIYwHeuwFAPEAmFYO9uN63Gyk.png",
                                        srcSet: "./framerusercontent.com/images/ZUIYwHeuwFAPEAmFYO9uN63Gyk.png?scale-down-to=1024 907w,./framerusercontent.com/images/ZUIYwHeuwFAPEAmFYO9uN63Gyk.png 1080w"
                                    }
                                },
                                XkiAMa1YK: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 5049,
                                        intrinsicWidth: 4474,
                                        loading: R((t?.y || 0) + -80 + -.49999999999954525),
                                        pixelHeight: 2031,
                                        pixelWidth: 1800,
                                        sizes: `calc(${t?.width || "100vw"} + 336px)`,
                                        src: "./framerusercontent.com/images/R504WJ9qEToHQTXqWS9pzPNjmCA.png",
                                        srcSet: "./framerusercontent.com/images/R504WJ9qEToHQTXqWS9pzPNjmCA.png?scale-down-to=1024 907w,./framerusercontent.com/images/R504WJ9qEToHQTXqWS9pzPNjmCA.png 1800w"
                                    }
                                }
                            }, n, u)
                        }), e(de, {
                            __perspectiveFX: !1,
                            __smartComponentFX: !0,
                            __targetOpacity: 1,
                            animate: he,
                            background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 5049,
                                intrinsicWidth: 4474,
                                pixelHeight: 2031,
                                pixelWidth: 1800,
                                src: "./framerusercontent.com/images/65iUuayXWpj4ou8OYX7I0Aq87xM.png",
                                srcSet: "./framerusercontent.com/images/65iUuayXWpj4ou8OYX7I0Aq87xM.png?scale-down-to=1024 907w,./framerusercontent.com/images/65iUuayXWpj4ou8OYX7I0Aq87xM.png 1800w"
                            },
                            className: "framer-1lzs2sj",
                            "data-framer-appear-id": "1lzs2sj",
                            "data-framer-name": "HLA dark_chest",
                            initial: ja,
                            layoutDependency: x,
                            layoutId: "CHZAJZioG",
                            optimized: !0,
                            ...G({
                                LRhSYb0jR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 5049,
                                        intrinsicWidth: 4474,
                                        loading: R((t?.y || 0) + -40 + -.27813040969397207),
                                        pixelHeight: 1219,
                                        pixelWidth: 1080,
                                        sizes: `calc(${t?.width || "100vw"} + 336px)`,
                                        src: "./framerusercontent.com/images/SBmtxo8rlNvQRA7FOfLYpEIE.png",
                                        srcSet: "./framerusercontent.com/images/SBmtxo8rlNvQRA7FOfLYpEIE.png?scale-down-to=1024 907w,./framerusercontent.com/images/SBmtxo8rlNvQRA7FOfLYpEIE.png 1080w"
                                    }
                                },
                                XkiAMa1YK: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 5049,
                                        intrinsicWidth: 4474,
                                        loading: R((t?.y || 0) + -80 + -.49999999999954525),
                                        pixelHeight: 2031,
                                        pixelWidth: 1800,
                                        sizes: `calc(${t?.width || "100vw"} + 336px)`,
                                        src: "./framerusercontent.com/images/65iUuayXWpj4ou8OYX7I0Aq87xM.png",
                                        srcSet: "./framerusercontent.com/images/65iUuayXWpj4ou8OYX7I0Aq87xM.png?scale-down-to=1024 907w,./framerusercontent.com/images/65iUuayXWpj4ou8OYX7I0Aq87xM.png 1800w"
                                    }
                                }
                            }, n, u)
                        }), e(de, {
                            __framer__loop: Pr,
                            __framer__loopEffectEnabled: !0,
                            __framer__loopRepeatDelay: 0,
                            __framer__loopRepeatType: "mirror",
                            __framer__loopTransition: Va,
                            __perspectiveFX: !1,
                            __smartComponentFX: !0,
                            __targetOpacity: 1,
                            animate: he,
                            background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1400,
                                intrinsicWidth: 2e3,
                                pixelHeight: 1400,
                                pixelWidth: 2e3,
                                src: "./framerusercontent.com/images/0bBBnYuBea6A5JjCDlIIkM9nEI.png",
                                srcSet: "./framerusercontent.com/images/0bBBnYuBea6A5JjCDlIIkM9nEI.png?scale-down-to=512 512w,./framerusercontent.com/images/0bBBnYuBea6A5JjCDlIIkM9nEI.png?scale-down-to=1024 1024w,./framerusercontent.com/images/0bBBnYuBea6A5JjCDlIIkM9nEI.png 2000w"
                            },
                            className: "framer-1ju8ms7",
                            "data-framer-appear-id": "1ju8ms7",
                            "data-framer-name": "Liquina's Gravity Blob",
                            initial: Ua,
                            layoutDependency: x,
                            layoutId: "KlsWGDd2l",
                            optimized: !0,
                            transformTemplate: Bt,
                            ...G({
                                LRhSYb0jR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1400,
                                        intrinsicWidth: 2e3,
                                        loading: R((t?.y || 0) + -40 + 460.4922100403926),
                                        pixelHeight: 1400,
                                        pixelWidth: 2e3,
                                        sizes: `calc((${t?.width || "100vw"} + 336px) * 0.295)`,
                                        src: "./framerusercontent.com/images/0bBBnYuBea6A5JjCDlIIkM9nEI.png",
                                        srcSet: "./framerusercontent.com/images/0bBBnYuBea6A5JjCDlIIkM9nEI.png?scale-down-to=512 512w,./framerusercontent.com/images/0bBBnYuBea6A5JjCDlIIkM9nEI.png?scale-down-to=1024 1024w,./framerusercontent.com/images/0bBBnYuBea6A5JjCDlIIkM9nEI.png 2000w"
                                    }
                                },
                                XkiAMa1YK: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1400,
                                        intrinsicWidth: 2e3,
                                        loading: R((t?.y || 0) + -80 + 827.908251586844),
                                        pixelHeight: 1400,
                                        pixelWidth: 2e3,
                                        sizes: `calc((${t?.width || "100vw"} + 336px) * 0.295)`,
                                        src: "./framerusercontent.com/images/0bBBnYuBea6A5JjCDlIIkM9nEI.png",
                                        srcSet: "./framerusercontent.com/images/0bBBnYuBea6A5JjCDlIIkM9nEI.png?scale-down-to=512 512w,./framerusercontent.com/images/0bBBnYuBea6A5JjCDlIIkM9nEI.png?scale-down-to=1024 1024w,./framerusercontent.com/images/0bBBnYuBea6A5JjCDlIIkM9nEI.png 2000w"
                                    }
                                }
                            }, n, u)
                        }), e(de, {
                            __perspectiveFX: !1,
                            __smartComponentFX: !0,
                            __targetOpacity: 1,
                            animate: he,
                            background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 5049,
                                intrinsicWidth: 4474,
                                pixelHeight: 2031,
                                pixelWidth: 1800,
                                src: "./framerusercontent.com/images/V8lKwp5juyYaR29oON4meutBZYM.png",
                                srcSet: "./framerusercontent.com/images/V8lKwp5juyYaR29oON4meutBZYM.png?scale-down-to=1024 907w,./framerusercontent.com/images/V8lKwp5juyYaR29oON4meutBZYM.png 1800w"
                            },
                            className: "framer-1dnhg77",
                            "data-framer-appear-id": "1dnhg77",
                            "data-framer-name": "HLA dark_left hand",
                            initial: hr,
                            layoutDependency: x,
                            layoutId: "dzHSXNXqI",
                            optimized: !0,
                            ...G({
                                LRhSYb0jR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 5049,
                                        intrinsicWidth: 4474,
                                        loading: R((t?.y || 0) + -40 + 0),
                                        pixelHeight: 1219,
                                        pixelWidth: 1080,
                                        sizes: `calc(${t?.width || "100vw"} + 336px)`,
                                        src: "./framerusercontent.com/images/QIVKdZbsCZaepE5pdb8VWyN8wcE.png",
                                        srcSet: "./framerusercontent.com/images/QIVKdZbsCZaepE5pdb8VWyN8wcE.png?scale-down-to=1024 907w,./framerusercontent.com/images/QIVKdZbsCZaepE5pdb8VWyN8wcE.png 1080w"
                                    }
                                },
                                XkiAMa1YK: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 5049,
                                        intrinsicWidth: 4474,
                                        loading: R((t?.y || 0) + -80 + 0),
                                        pixelHeight: 2031,
                                        pixelWidth: 1800,
                                        sizes: `calc(${t?.width || "100vw"} + 336px)`,
                                        src: "./framerusercontent.com/images/V8lKwp5juyYaR29oON4meutBZYM.png",
                                        srcSet: "./framerusercontent.com/images/V8lKwp5juyYaR29oON4meutBZYM.png?scale-down-to=1024 907w,./framerusercontent.com/images/V8lKwp5juyYaR29oON4meutBZYM.png 1800w"
                                    }
                                }
                            }, n, u)
                        }), e(de, {
                            __perspectiveFX: !1,
                            __smartComponentFX: !0,
                            __targetOpacity: 1,
                            animate: he,
                            background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 5049,
                                intrinsicWidth: 4474,
                                pixelHeight: 2031,
                                pixelWidth: 1800,
                                src: "./framerusercontent.com/images/EsDh3ErJgDzJZad2v4wP8v3xcfQ.png",
                                srcSet: "./framerusercontent.com/images/EsDh3ErJgDzJZad2v4wP8v3xcfQ.png?scale-down-to=1024 907w,./framerusercontent.com/images/EsDh3ErJgDzJZad2v4wP8v3xcfQ.png 1800w"
                            },
                            className: "framer-g5ukvm",
                            "data-framer-appear-id": "g5ukvm",
                            "data-framer-name": "HLA dark_right hand",
                            initial: hr,
                            layoutDependency: x,
                            layoutId: "Nl8Sc3hve",
                            optimized: !0,
                            ...G({
                                LRhSYb0jR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 5049,
                                        intrinsicWidth: 4474,
                                        loading: R((t?.y || 0) + -40 + -.27813040969397207),
                                        pixelHeight: 1219,
                                        pixelWidth: 1080,
                                        sizes: `calc(${t?.width || "100vw"} + 336px)`,
                                        src: "./framerusercontent.com/images/plKwnnSsaut7fewppOaby5fHSLA.png",
                                        srcSet: "./framerusercontent.com/images/plKwnnSsaut7fewppOaby5fHSLA.png?scale-down-to=1024 907w,./framerusercontent.com/images/plKwnnSsaut7fewppOaby5fHSLA.png 1080w"
                                    }
                                },
                                XkiAMa1YK: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 5049,
                                        intrinsicWidth: 4474,
                                        loading: R((t?.y || 0) + -80 + -.49999999999954525),
                                        pixelHeight: 2031,
                                        pixelWidth: 1800,
                                        sizes: `calc(${t?.width || "100vw"} + 336px)`,
                                        src: "./framerusercontent.com/images/EsDh3ErJgDzJZad2v4wP8v3xcfQ.png",
                                        srcSet: "./framerusercontent.com/images/EsDh3ErJgDzJZad2v4wP8v3xcfQ.png?scale-down-to=1024 907w,./framerusercontent.com/images/EsDh3ErJgDzJZad2v4wP8v3xcfQ.png 1800w"
                                    }
                                }
                            }, n, u)
                        })]
                    }), V() && b(zt, {
                        __framer__loop: Pr,
                        __framer__loopEffectEnabled: !0,
                        __framer__loopRepeatDelay: .4,
                        __framer__loopRepeatType: "mirror",
                        __framer__loopTransition: at,
                        __perspectiveFX: !1,
                        __smartComponentFX: !0,
                        __targetOpacity: 1,
                        className: "framer-sg9l9l",
                        "data-framer-name": "HyperLiquina_Light",
                        layoutDependency: x,
                        layoutId: "mpeDdU2oi",
                        children: [e(de, {
                            __perspectiveFX: !1,
                            __smartComponentFX: !0,
                            __targetOpacity: 1,
                            animate: he,
                            background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 5049,
                                intrinsicWidth: 4474,
                                pixelHeight: 2031,
                                pixelWidth: 1800,
                                src: "./framerusercontent.com/images/T1egGJdlohkUtRGpcWxR1Uly4Nk.png",
                                srcSet: "./framerusercontent.com/images/T1egGJdlohkUtRGpcWxR1Uly4Nk.png?scale-down-to=1024 907w,./framerusercontent.com/images/T1egGJdlohkUtRGpcWxR1Uly4Nk.png 1800w"
                            },
                            className: "framer-1ttmy6w",
                            "data-framer-appear-id": "1ttmy6w",
                            "data-framer-name": "HLA normal_body",
                            initial: hr,
                            layoutDependency: x,
                            layoutId: "YiVK3m_nT",
                            optimized: !0,
                            ...G({
                                LRhSYb0jR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 5049,
                                        intrinsicWidth: 4474,
                                        loading: R((t?.y || 0) + -40 + 0),
                                        pixelHeight: 1219,
                                        pixelWidth: 1080,
                                        sizes: `calc(${t?.width || "100vw"} + 336px)`,
                                        src: "./framerusercontent.com/images/K2OfldOHHjFSeUzfh96Ha94IvY.png",
                                        srcSet: "./framerusercontent.com/images/K2OfldOHHjFSeUzfh96Ha94IvY.png?scale-down-to=1024 907w,./framerusercontent.com/images/K2OfldOHHjFSeUzfh96Ha94IvY.png 1080w"
                                    }
                                },
                                XkiAMa1YK: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 5049,
                                        intrinsicWidth: 4474,
                                        loading: R((t?.y || 0) + -80 + 0),
                                        pixelHeight: 2031,
                                        pixelWidth: 1800,
                                        sizes: `calc(${t?.width || "100vw"} + 336px)`,
                                        src: "./framerusercontent.com/images/T1egGJdlohkUtRGpcWxR1Uly4Nk.png",
                                        srcSet: "./framerusercontent.com/images/T1egGJdlohkUtRGpcWxR1Uly4Nk.png?scale-down-to=1024 907w,./framerusercontent.com/images/T1egGJdlohkUtRGpcWxR1Uly4Nk.png 1800w"
                                    }
                                }
                            }, n, u)
                        }), e(de, {
                            __perspectiveFX: !1,
                            __smartComponentFX: !0,
                            __targetOpacity: 1,
                            animate: he,
                            background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 5049,
                                intrinsicWidth: 4474,
                                pixelHeight: 2031,
                                pixelWidth: 1800,
                                src: "./framerusercontent.com/images/mPgI8llKkJkQNEkewHeCbs3xgKI.png",
                                srcSet: "./framerusercontent.com/images/mPgI8llKkJkQNEkewHeCbs3xgKI.png?scale-down-to=1024 907w,./framerusercontent.com/images/mPgI8llKkJkQNEkewHeCbs3xgKI.png 1800w"
                            },
                            className: "framer-mk14fx",
                            "data-framer-appear-id": "mk14fx",
                            "data-framer-name": "HLA normal_right arm",
                            initial: Ma,
                            layoutDependency: x,
                            layoutId: "Zg7KTRf9f",
                            optimized: !0,
                            ...G({
                                LRhSYb0jR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 5049,
                                        intrinsicWidth: 4474,
                                        loading: R((t?.y || 0) + -40 + 0),
                                        pixelHeight: 1219,
                                        pixelWidth: 1080,
                                        sizes: `calc(${t?.width || "100vw"} + 336px)`,
                                        src: "./framerusercontent.com/images/lUT36Y3cC2N7JXIMbWr9VKdpVDI.png",
                                        srcSet: "./framerusercontent.com/images/lUT36Y3cC2N7JXIMbWr9VKdpVDI.png?scale-down-to=1024 907w,./framerusercontent.com/images/lUT36Y3cC2N7JXIMbWr9VKdpVDI.png 1080w"
                                    }
                                },
                                XkiAMa1YK: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 5049,
                                        intrinsicWidth: 4474,
                                        loading: R((t?.y || 0) + -80 + 0),
                                        pixelHeight: 2031,
                                        pixelWidth: 1800,
                                        sizes: `calc(${t?.width || "100vw"} + 336px)`,
                                        src: "./framerusercontent.com/images/mPgI8llKkJkQNEkewHeCbs3xgKI.png",
                                        srcSet: "./framerusercontent.com/images/mPgI8llKkJkQNEkewHeCbs3xgKI.png?scale-down-to=1024 907w,./framerusercontent.com/images/mPgI8llKkJkQNEkewHeCbs3xgKI.png 1800w"
                                    }
                                }
                            }, n, u)
                        }), e(de, {
                            __perspectiveFX: !1,
                            __smartComponentFX: !0,
                            __targetOpacity: 1,
                            animate: he,
                            background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 5049,
                                intrinsicWidth: 4474,
                                pixelHeight: 2031,
                                pixelWidth: 1800,
                                src: "./framerusercontent.com/images/AbGW6XfRQXtXqna1AVNgtvIKcDQ.png",
                                srcSet: "./framerusercontent.com/images/AbGW6XfRQXtXqna1AVNgtvIKcDQ.png?scale-down-to=1024 907w,./framerusercontent.com/images/AbGW6XfRQXtXqna1AVNgtvIKcDQ.png 1800w"
                            },
                            className: "framer-1x6vn3u",
                            "data-framer-appear-id": "1x6vn3u",
                            "data-framer-name": "HLA normal_left arm",
                            initial: qa,
                            layoutDependency: x,
                            layoutId: "JB33WWWJ1",
                            optimized: !0,
                            ...G({
                                LRhSYb0jR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 5049,
                                        intrinsicWidth: 4474,
                                        loading: R((t?.y || 0) + -40 + 0),
                                        pixelHeight: 1219,
                                        pixelWidth: 1080,
                                        sizes: `calc(${t?.width || "100vw"} + 336px)`,
                                        src: "./framerusercontent.com/images/G0PkPML22nIpvlVAPZNJE4YGIA.png",
                                        srcSet: "./framerusercontent.com/images/G0PkPML22nIpvlVAPZNJE4YGIA.png?scale-down-to=1024 907w,./framerusercontent.com/images/G0PkPML22nIpvlVAPZNJE4YGIA.png 1080w"
                                    }
                                },
                                XkiAMa1YK: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 5049,
                                        intrinsicWidth: 4474,
                                        loading: R((t?.y || 0) + -80 + 0),
                                        pixelHeight: 2031,
                                        pixelWidth: 1800,
                                        sizes: `calc(${t?.width || "100vw"} + 336px)`,
                                        src: "./framerusercontent.com/images/AbGW6XfRQXtXqna1AVNgtvIKcDQ.png",
                                        srcSet: "./framerusercontent.com/images/AbGW6XfRQXtXqna1AVNgtvIKcDQ.png?scale-down-to=1024 907w,./framerusercontent.com/images/AbGW6XfRQXtXqna1AVNgtvIKcDQ.png 1800w"
                                    }
                                }
                            }, n, u)
                        }), e(de, {
                            __perspectiveFX: !1,
                            __smartComponentFX: !0,
                            __targetOpacity: 1,
                            animate: he,
                            background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 5049,
                                intrinsicWidth: 4474,
                                pixelHeight: 2031,
                                pixelWidth: 1800,
                                src: "./framerusercontent.com/images/uGIyz7pG7hB1qSCzjRFIpSbFz0g.png",
                                srcSet: "./framerusercontent.com/images/uGIyz7pG7hB1qSCzjRFIpSbFz0g.png?scale-down-to=1024 907w,./framerusercontent.com/images/uGIyz7pG7hB1qSCzjRFIpSbFz0g.png 1800w"
                            },
                            className: "framer-1fhbtg7",
                            "data-framer-appear-id": "1fhbtg7",
                            "data-framer-name": "HLA normal_chest",
                            initial: ja,
                            layoutDependency: x,
                            layoutId: "zIG8kmsze",
                            optimized: !0,
                            ...G({
                                LRhSYb0jR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 5049,
                                        intrinsicWidth: 4474,
                                        loading: R((t?.y || 0) + -40 + -.27813040969397207),
                                        pixelHeight: 1219,
                                        pixelWidth: 1080,
                                        sizes: `calc(${t?.width || "100vw"} + 336px)`,
                                        src: "./framerusercontent.com/images/IfUQqVe3NLId3A11VXUNTvPSB4.png",
                                        srcSet: "./framerusercontent.com/images/IfUQqVe3NLId3A11VXUNTvPSB4.png?scale-down-to=1024 907w,./framerusercontent.com/images/IfUQqVe3NLId3A11VXUNTvPSB4.png 1080w"
                                    }
                                },
                                XkiAMa1YK: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 5049,
                                        intrinsicWidth: 4474,
                                        loading: R((t?.y || 0) + -80 + -.49999999999954525),
                                        pixelHeight: 2031,
                                        pixelWidth: 1800,
                                        sizes: `calc(${t?.width || "100vw"} + 336px)`,
                                        src: "./framerusercontent.com/images/uGIyz7pG7hB1qSCzjRFIpSbFz0g.png",
                                        srcSet: "./framerusercontent.com/images/uGIyz7pG7hB1qSCzjRFIpSbFz0g.png?scale-down-to=1024 907w,./framerusercontent.com/images/uGIyz7pG7hB1qSCzjRFIpSbFz0g.png 1800w"
                                    }
                                }
                            }, n, u)
                        }), e(de, {
                            __framer__loop: Pr,
                            __framer__loopEffectEnabled: !0,
                            __framer__loopRepeatDelay: 0,
                            __framer__loopRepeatType: "mirror",
                            __framer__loopTransition: Va,
                            __perspectiveFX: !1,
                            __smartComponentFX: !0,
                            __targetOpacity: 1,
                            animate: he,
                            background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1400,
                                intrinsicWidth: 2e3,
                                pixelHeight: 1400,
                                pixelWidth: 2e3,
                                src: "./framerusercontent.com/images/0bBBnYuBea6A5JjCDlIIkM9nEI.png",
                                srcSet: "./framerusercontent.com/images/0bBBnYuBea6A5JjCDlIIkM9nEI.png?scale-down-to=512 512w,./framerusercontent.com/images/0bBBnYuBea6A5JjCDlIIkM9nEI.png?scale-down-to=1024 1024w,./framerusercontent.com/images/0bBBnYuBea6A5JjCDlIIkM9nEI.png 2000w"
                            },
                            className: "framer-1c3q2hs",
                            "data-framer-appear-id": "1c3q2hs",
                            "data-framer-name": "Liquina's Gravity Blob",
                            initial: Ua,
                            layoutDependency: x,
                            layoutId: "Rs3tkXgtg",
                            optimized: !0,
                            transformTemplate: Bt,
                            ...G({
                                LRhSYb0jR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1400,
                                        intrinsicWidth: 2e3,
                                        loading: R((t?.y || 0) + -40 + 454.9296018465091),
                                        pixelHeight: 1400,
                                        pixelWidth: 2e3,
                                        sizes: `calc((${t?.width || "100vw"} + 336px) * 0.295)`,
                                        src: "./framerusercontent.com/images/0bBBnYuBea6A5JjCDlIIkM9nEI.png",
                                        srcSet: "./framerusercontent.com/images/0bBBnYuBea6A5JjCDlIIkM9nEI.png?scale-down-to=512 512w,./framerusercontent.com/images/0bBBnYuBea6A5JjCDlIIkM9nEI.png?scale-down-to=1024 1024w,./framerusercontent.com/images/0bBBnYuBea6A5JjCDlIIkM9nEI.png 2000w"
                                    }
                                },
                                XkiAMa1YK: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1400,
                                        intrinsicWidth: 2e3,
                                        loading: R((t?.y || 0) + -80 + 817.908251586844),
                                        pixelHeight: 1400,
                                        pixelWidth: 2e3,
                                        sizes: `calc((${t?.width || "100vw"} + 336px) * 0.295)`,
                                        src: "./framerusercontent.com/images/0bBBnYuBea6A5JjCDlIIkM9nEI.png",
                                        srcSet: "./framerusercontent.com/images/0bBBnYuBea6A5JjCDlIIkM9nEI.png?scale-down-to=512 512w,./framerusercontent.com/images/0bBBnYuBea6A5JjCDlIIkM9nEI.png?scale-down-to=1024 1024w,./framerusercontent.com/images/0bBBnYuBea6A5JjCDlIIkM9nEI.png 2000w"
                                    }
                                }
                            }, n, u)
                        }), e(de, {
                            __perspectiveFX: !1,
                            __smartComponentFX: !0,
                            __targetOpacity: 1,
                            animate: he,
                            background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 5049,
                                intrinsicWidth: 4474,
                                pixelHeight: 2031,
                                pixelWidth: 1800,
                                src: "./framerusercontent.com/images/uh8F4FEHtPJNboSkzCyYryqpevA.png",
                                srcSet: "./framerusercontent.com/images/uh8F4FEHtPJNboSkzCyYryqpevA.png?scale-down-to=1024 907w,./framerusercontent.com/images/uh8F4FEHtPJNboSkzCyYryqpevA.png 1800w"
                            },
                            className: "framer-wmshh7",
                            "data-framer-appear-id": "wmshh7",
                            "data-framer-name": "HLA normal_left hand",
                            initial: hr,
                            layoutDependency: x,
                            layoutId: "KtGPmnWMg",
                            optimized: !0,
                            ...G({
                                LRhSYb0jR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 5049,
                                        intrinsicWidth: 4474,
                                        loading: R((t?.y || 0) + -40 + 0),
                                        pixelHeight: 1219,
                                        pixelWidth: 1080,
                                        sizes: `calc(${t?.width || "100vw"} + 336px)`,
                                        src: "./framerusercontent.com/images/zdQ8e7akB7UX6MUPfjdhoJJ3kPY.png",
                                        srcSet: "./framerusercontent.com/images/zdQ8e7akB7UX6MUPfjdhoJJ3kPY.png?scale-down-to=1024 907w,./framerusercontent.com/images/zdQ8e7akB7UX6MUPfjdhoJJ3kPY.png 1080w"
                                    }
                                },
                                XkiAMa1YK: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 5049,
                                        intrinsicWidth: 4474,
                                        loading: R((t?.y || 0) + -80 + 0),
                                        pixelHeight: 2031,
                                        pixelWidth: 1800,
                                        sizes: `calc(${t?.width || "100vw"} + 336px)`,
                                        src: "./framerusercontent.com/images/uh8F4FEHtPJNboSkzCyYryqpevA.png",
                                        srcSet: "./framerusercontent.com/images/uh8F4FEHtPJNboSkzCyYryqpevA.png?scale-down-to=1024 907w,./framerusercontent.com/images/uh8F4FEHtPJNboSkzCyYryqpevA.png 1800w"
                                    }
                                }
                            }, n, u)
                        }), e(de, {
                            __perspectiveFX: !1,
                            __smartComponentFX: !0,
                            __targetOpacity: 1,
                            animate: he,
                            background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 5049,
                                intrinsicWidth: 4474,
                                pixelHeight: 2031,
                                pixelWidth: 1800,
                                src: "./framerusercontent.com/images/ySXnxWXg9QHgSl10vy4OLfBA1bM.png",
                                srcSet: "./framerusercontent.com/images/ySXnxWXg9QHgSl10vy4OLfBA1bM.png?scale-down-to=1024 907w,./framerusercontent.com/images/ySXnxWXg9QHgSl10vy4OLfBA1bM.png 1800w"
                            },
                            className: "framer-uq2ttd",
                            "data-framer-appear-id": "uq2ttd",
                            "data-framer-name": "HLA normal_right hand",
                            initial: hr,
                            layoutDependency: x,
                            layoutId: "MIaSBqiyi",
                            optimized: !0,
                            ...G({
                                LRhSYb0jR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 5049,
                                        intrinsicWidth: 4474,
                                        loading: R((t?.y || 0) + -40 + 0),
                                        pixelHeight: 1219,
                                        pixelWidth: 1080,
                                        sizes: `calc(${t?.width || "100vw"} + 336px)`,
                                        src: "./framerusercontent.com/images/6f7JoukluDUTyUk8gBLCt66pu0.png",
                                        srcSet: "./framerusercontent.com/images/6f7JoukluDUTyUk8gBLCt66pu0.png?scale-down-to=1024 907w,./framerusercontent.com/images/6f7JoukluDUTyUk8gBLCt66pu0.png 1080w"
                                    }
                                },
                                XkiAMa1YK: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 5049,
                                        intrinsicWidth: 4474,
                                        loading: R((t?.y || 0) + -80 + 0),
                                        pixelHeight: 2031,
                                        pixelWidth: 1800,
                                        sizes: `calc(${t?.width || "100vw"} + 336px)`,
                                        src: "./framerusercontent.com/images/ySXnxWXg9QHgSl10vy4OLfBA1bM.png",
                                        srcSet: "./framerusercontent.com/images/ySXnxWXg9QHgSl10vy4OLfBA1bM.png?scale-down-to=1024 907w,./framerusercontent.com/images/ySXnxWXg9QHgSl10vy4OLfBA1bM.png 1800w"
                                    }
                                }
                            }, n, u)
                        })]
                    }), e(ne, {
                        height: 480,
                        width: `calc(${t?.width || "100vw"} * 0.16)`,
                        y: (t?.y || 0) + ((t?.height || 1111) * .7596759675967599 - 240),
                        ...G({
                            DS0xI1e0I: {
                                height: 83,
                                width: `calc(${t?.width || "100vw"} / 6.241)`,
                                y: (t?.y || 0) + ((t?.height || 480) * .9812500000000002 - 41.5)
                            },
                            LRhSYb0jR: {
                                height: 83,
                                y: (t?.y || 0) + ((t?.height || 480) * .9812500000000002 - 41.5)
                            }
                        }, n, u),
                        children: e(zt, {
                            __framer__loop: Mi,
                            __framer__loopEffectEnabled: !0,
                            __framer__loopRepeatDelay: .4,
                            __framer__loopRepeatType: "mirror",
                            __framer__loopTransition: at,
                            __perspectiveFX: !1,
                            __smartComponentFX: !0,
                            __targetOpacity: 1,
                            className: "framer-nbck29-container",
                            layoutDependency: x,
                            layoutId: "BSRvVWXwD-container",
                            transformTemplate: Bt,
                            ...G({
                                LRhSYb0jR: {
                                    transformTemplate: void 0
                                }
                            }, n, u),
                            children: e(rr, {
                                height: "100%",
                                id: "BSRvVWXwD",
                                layoutId: "BSRvVWXwD",
                                style: {
                                    height: "100%",
                                    width: "100%"
                                },
                                variant: "yt2yRgvlL",
                                width: "100%"
                            })
                        })
                    }), e(O.div, {
                        className: "framer-1d3pvd7",
                        layoutDependency: x,
                        layoutId: "TifnfMa25",
                        style: {
                            background: "linear-gradient(180deg, rgba(0, 9, 8, 0) 63.33755630630631%, rgba(0, 9, 8, 0.8) 88.28828828828829%, rgb(0, 9, 8) 100%)"
                        }
                    })]
                })
            })
        })
    })
})
  , Gi = ["@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }", ".framer-s9Bp5.framer-rbpuvv, .framer-s9Bp5 .framer-rbpuvv { display: block; }", ".framer-s9Bp5.framer-br0or5 { height: 1111px; max-width: 1200px; min-width: 480px; overflow: visible; position: relative; width: 1200px; }", ".framer-s9Bp5 .framer-1o0hmnp, .framer-s9Bp5 .framer-1d3pvd7 { aspect-ratio: 0.8862629246676514 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 1733px); left: -168px; overflow: hidden; position: absolute; right: -168px; top: -80px; }", ".framer-s9Bp5 .framer-1i8oab9 { aspect-ratio: 0.8862629246676514 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 1733px); left: -168px; overflow: visible; position: absolute; right: -168px; top: -80px; }", ".framer-s9Bp5 .framer-1w067yx { aspect-ratio: 0.8861160625866509 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 1733px); left: -168px; overflow: visible; position: absolute; right: -168px; top: -80px; }", ".framer-s9Bp5 .framer-166hk18, .framer-s9Bp5 .framer-sg9l9l { aspect-ratio: 0.8863242931332949 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 1733px); left: -168px; overflow: hidden; position: absolute; right: -168px; top: 0px; }", ".framer-s9Bp5 .framer-1mxemti, .framer-s9Bp5 .framer-okk8um, .framer-s9Bp5 .framer-1dnhg77, .framer-s9Bp5 .framer-1ttmy6w, .framer-s9Bp5 .framer-mk14fx, .framer-s9Bp5 .framer-1x6vn3u, .framer-s9Bp5 .framer-wmshh7, .framer-s9Bp5 .framer-uq2ttd { flex: none; height: 100%; left: 0px; overflow: visible; position: absolute; top: 0px; width: 100%; }", ".framer-s9Bp5 .framer-1hqq36p, .framer-s9Bp5 .framer-1lzs2sj, .framer-s9Bp5 .framer-g5ukvm, .framer-s9Bp5 .framer-1fhbtg7 { flex: none; height: 100%; left: calc(50.00000000000002% - 100% / 2); overflow: visible; position: absolute; top: calc(49.97114829774959% - 100% / 2); width: 100%; }", ".framer-s9Bp5 .framer-1ju8ms7 { aspect-ratio: 1.4285714285714286 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 317px); left: 50%; mix-blend-mode: multiply; overflow: visible; position: absolute; top: 48%; width: 30%; }", ".framer-s9Bp5 .framer-1c3q2hs { aspect-ratio: 1.4285714285714286 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 317px); left: 50%; mix-blend-mode: multiply; overflow: visible; position: absolute; top: 47%; width: 30%; }", ".framer-s9Bp5 .framer-nbck29-container { aspect-ratio: 1 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 192px); left: 50%; position: absolute; top: 76%; width: 16%; z-index: 1; }", ".framer-s9Bp5.framer-v-1wwnioy.framer-br0or5 { aspect-ratio: 1.08 / 1; height: var(--framer-aspect-ratio-supported, 480px); width: 518px; }", ".framer-s9Bp5.framer-v-1wwnioy .framer-1o0hmnp, .framer-s9Bp5.framer-v-1wwnioy .framer-1i8oab9, .framer-s9Bp5.framer-v-1wwnioy .framer-1w067yx, .framer-s9Bp5.framer-v-1wwnioy .framer-1d3pvd7, .framer-s9Bp5.framer-v-166zujf .framer-1o0hmnp, .framer-s9Bp5.framer-v-166zujf .framer-1i8oab9, .framer-s9Bp5.framer-v-166zujf .framer-1w067yx, .framer-s9Bp5.framer-v-166zujf .framer-166hk18, .framer-s9Bp5.framer-v-166zujf .framer-sg9l9l, .framer-s9Bp5.framer-v-166zujf .framer-1d3pvd7 { height: var(--framer-aspect-ratio-supported, 964px); top: -40px; }", ".framer-s9Bp5.framer-v-1wwnioy .framer-nbck29-container { height: var(--framer-aspect-ratio-supported, 83px); top: 98%; width: 16%; }", ".framer-s9Bp5.framer-v-1w83hf2 .framer-166hk18, .framer-s9Bp5.framer-v-1w83hf2 .framer-sg9l9l { top: -80px; }", ".framer-s9Bp5.framer-v-166zujf.framer-br0or5 { height: 480px; width: 518px; }", ".framer-s9Bp5.framer-v-166zujf .framer-1ju8ms7 { height: var(--framer-aspect-ratio-supported, 177px); }", ".framer-s9Bp5.framer-v-166zujf .framer-1c3q2hs { height: var(--framer-aspect-ratio-supported, 176px); }", ".framer-s9Bp5.framer-v-166zujf .framer-nbck29-container { aspect-ratio: unset; height: 83px; left: calc(50.00000000000002% - 16% / 2); top: calc(98.12500000000001% - 83px / 2); }"]
  , Nr = Je(Ji, Gi, "framer-s9Bp5")
  , Wt = Nr;
Nr.displayName = "Main Banner";
Nr.defaultProps = {
    height: 1111,
    width: 1200
};
Oe(Nr, {
    variant: {
        options: ["HQlUbiSz0", "DS0xI1e0I", "XkiAMa1YK", "LRhSYb0jR"],
        optionTitles: ["Liquina", "Liquina_m", "HLiquina", "HLiquina_m"],
        title: "Variant",
        type: c.Enum
    }
});
Ge(Nr, [{
    explicitInter: !0,
    fonts: []
}, ...Ei], {
    supportsExplicitInterCodegen: !0
});
var Qi = ["sKMEbgsQk", "QbRCp5BO4"]
  , Ki = "framer-8XRvD"
  , $i = {
    QbRCp5BO4: "framer-v-1gi56fh",
    sKMEbgsQk: "framer-v-1cjztki"
};
function eo(r, ...i) {
    let s = {};
    return i?.forEach(o => o && Object.assign(s, r[o])),
    s
}
var ro = {
    bounce: .2,
    delay: 0,
    duration: .4,
    type: "spring"
}
  , to = ({value: r, children: i}) => {
    let s = lr(Ie)
      , o = r ?? s.transition
      , m = Se( () => ({
        ...s,
        transition: o
    }), [JSON.stringify(o)]);
    return e(Ie.Provider, {
        value: m,
        children: i
    })
}
  , ao = O.create(a)
  , no = {
    "Variant 1": "sKMEbgsQk",
    "Variant 2": "QbRCp5BO4"
}
  , io = ({height: r, id: i, width: s, ...o}) => {
    var m, p;
    return {
        ...o,
        variant: (p = (m = no[o.variant]) !== null && m !== void 0 ? m : o.variant) !== null && p !== void 0 ? p : "sKMEbgsQk"
    }
}
  , oo = (r, i) => r.layoutDependency ? i.join("-") + r.layoutDependency : i.join("-")
  , so = Re(function(r, i) {
    let {activeLocale: s, setLocale: o} = De()
      , {style: m, className: p, layoutId: h, variant: k, ...g} = io(r)
      , {baseVariant: n, classNames: _, clearLoadingGesture: w, gestureHandlers: L, gestureVariant: u, isLoading: v, setGestureState: Y, setVariant: C, variants: E} = fr({
        cycleOrder: Qi,
        defaultVariant: "sKMEbgsQk",
        variant: k,
        variantClassNames: $i
    })
      , x = oo(r, E)
      , H = X(null)
      , M = Ve()
      , q = []
      , I = mr();
    return e(pe, {
        id: h ?? M,
        children: e(ao, {
            animate: E,
            initial: !1,
            children: e(to, {
                value: ro,
                children: e($, {
                    ...g,
                    ...L,
                    background: {
                        alt: "",
                        fit: "fill",
                        intrinsicHeight: 600,
                        intrinsicWidth: 600,
                        loading: R(I?.y || 0),
                        pixelHeight: 600,
                        pixelWidth: 600,
                        sizes: I?.width || "100vw",
                        src: "./framerusercontent.com/images/jImGw5HacVKz6p1G6FWxv3Uq10.gif",
                        srcSet: "./framerusercontent.com/images/jImGw5HacVKz6p1G6FWxv3Uq10.gif?scale-down-to=512 512w,./framerusercontent.com/images/jImGw5HacVKz6p1G6FWxv3Uq10.gif 600w"
                    },
                    className: Xe(Ki, ...q, "framer-1cjztki", p, _),
                    "data-framer-name": "Variant 1",
                    layoutDependency: x,
                    layoutId: "sKMEbgsQk",
                    ref: i ?? H,
                    style: {
                        ...m
                    },
                    ...eo({
                        QbRCp5BO4: {
                            "data-framer-name": "Variant 2"
                        }
                    }, n, u)
                })
            })
        })
    })
})
  , lo = ["@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }", ".framer-8XRvD.framer-8kh5nk, .framer-8XRvD .framer-8kh5nk { display: block; }", ".framer-8XRvD.framer-1cjztki { height: 600px; overflow: visible; position: relative; width: 600px; }", ".framer-8XRvD.framer-v-1gi56fh.framer-1cjztki { aspect-ratio: 1 / 1; height: var(--framer-aspect-ratio-supported, 40px); width: 40px; }"]
  , Fr = Je(so, lo, "framer-8XRvD")
  , Zt = Fr;
Fr.displayName = "Gravity Blob";
Fr.defaultProps = {
    height: 600,
    width: 600
};
Oe(Fr, {
    variant: {
        options: ["sKMEbgsQk", "QbRCp5BO4"],
        optionTitles: ["Variant 1", "Variant 2"],
        title: "Variant",
        type: c.Enum
    }
});
Ge(Fr, [{
    explicitInter: !0,
    fonts: []
}], {
    supportsExplicitInterCodegen: !0
});
var mo = qe(Zt)
  , co = qe(rr)
  , fo = qe(Fe)
  , po = qe(Wt)
  , Xt = Me(Ye)
  , se = Me(l)
  , ho = qe(Le)
  , ge = Me(O.div)
  , S = Me($)
  , Hr = Jr(O.div)
  , go = qe(U)
  , uo = {
    BE_1LvUPA: "(min-width: 560px) and (max-width: 959px)",
    P1gAhaWwm: "(min-width: 960px)",
    tbgdi9qHR: "(max-width: 559px)"
};
var Da = "framer-oYeZ4"
  , bo = {
    BE_1LvUPA: "framer-v-itrfun",
    P1gAhaWwm: "framer-v-xfymdx",
    tbgdi9qHR: "framer-v-19sufzk"
}
  , _o = {
    delay: 0,
    duration: 2.4,
    ease: [.44, 0, .56, 1],
    type: "tween"
}
  , wo = {
    opacity: 1,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1.008,
    skewX: 0,
    skewY: 0,
    x: 0,
    y: -8
}
  , Mt = {
    opacity: 0,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    scale: .96,
    skewX: 0,
    skewY: 0,
    x: 0,
    y: 8
}
  , ot = {
    delay: 0,
    duration: .4,
    ease: [.44, 0, .56, 1],
    type: "tween"
}
  , qt = {
    opacity: 0,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    scale: .96,
    skewX: 0,
    skewY: 0,
    transition: ot,
    x: 0,
    y: 8
}
  , xo = {
    bounce: .25,
    delay: 0,
    duration: .45,
    type: "spring"
}
  , Ir = {
    opacity: .64,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    scale: .8,
    skewX: 0,
    skewY: 0,
    transition: xo
}
  , yo = (r, i) => `translate(-50%, -50%) ${i}`
  , vo = {
    delay: .08,
    duration: .64,
    ease: [.59, .02, .56, 1],
    type: "tween"
}
  , Er = {
    opacity: 1,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0,
    transition: vo,
    x: 0,
    y: 0
}
  , zr = {
    opacity: .001,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0,
    x: 0,
    y: 40
}
  , nt = {
    opacity: 0,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0,
    x: 0,
    y: 24
}
  , Qa = {
    bounce: .2,
    delay: 0,
    duration: .8,
    type: "spring"
}
  , ko = {
    opacity: 0,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0,
    transition: Qa,
    x: 0,
    y: 24
}
  , Co = {
    delay: 0,
    duration: 40,
    ease: [0, 0, 1, 1],
    type: "tween"
}
  , Ro = {
    opacity: 1,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1.4,
    skewX: 0,
    skewY: 0,
    x: 0,
    y: 0
}
  , d = {
    bounce: .2,
    delay: 0,
    duration: .4,
    type: "spring"
}
  , jt = {
    opacity: 0,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0,
    transition: d,
    x: 0,
    y: 24
}
  , Vt = {
    delay: 0,
    duration: 2.4,
    ease: [0, 0, 1, 1],
    type: "tween"
}
  , So = {
    opacity: 1,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    scale: .96,
    skewX: 0,
    skewY: 0,
    x: 0,
    y: -4
}
  , it = {
    opacity: 0,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0,
    x: 0,
    y: 16
}
  , Dt = {
    bounce: .2,
    delay: 0,
    duration: .64,
    type: "spring"
}
  , Ja = {
    opacity: 0,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0,
    transition: Dt,
    x: 0,
    y: 16
}
  , Ao = {
    delay: 0,
    duration: 2,
    ease: [0, 0, 1, 1],
    type: "tween"
}
  , Oo = {
    opacity: 1,
    rotate: -4,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0,
    x: 0,
    y: 4
}
  , Yo = {
    delay: 0,
    duration: 3.2,
    ease: [0, 0, 1, 1],
    type: "tween"
}
  , Lo = {
    opacity: 1,
    rotate: 1,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0,
    x: 0,
    y: 4
}
  , To = {
    opacity: 1,
    rotate: -4,
    rotateX: 0,
    rotateY: 0,
    scale: 1.04,
    skewX: 0,
    skewY: 0,
    x: 0,
    y: 0
}
  , Po = {
    opacity: 1,
    rotate: 2,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0,
    x: 0,
    y: 2
}
  , P = {
    opacity: 0,
    rotate: 8,
    rotateX: 0,
    rotateY: 0,
    scale: .92,
    skewX: 0,
    skewY: 0,
    x: 0,
    y: 0
}
  , N = {
    opacity: 0,
    rotate: 8,
    rotateX: 0,
    rotateY: 0,
    scale: .92,
    skewX: 0,
    skewY: 0,
    transition: d,
    x: 0,
    y: 0
}
  , Jt = {
    delay: 0,
    duration: .64,
    ease: [.44, 0, .56, 1],
    type: "tween"
}
  , Ga = {
    opacity: 0,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0,
    transition: Jt,
    x: 0,
    y: 16
}
  , W = (r, i) => `translateX(-50%) ${i}`
  , we = {
    opacity: 0,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    scale: .4,
    skewX: 0,
    skewY: 0,
    x: 0,
    y: 0
}
  , xe = {
    opacity: 0,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    scale: .4,
    skewX: 0,
    skewY: 0,
    transition: d,
    x: 0,
    y: 0
}
  , ye = {
    opacity: 0,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0,
    x: 0,
    y: 0
}
  , ve = {
    opacity: 0,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0,
    transition: d,
    x: 0,
    y: 0
}
  , Ut = Gr()
  , No = {
    Desktop: "P1gAhaWwm",
    Phone: "tbgdi9qHR",
    Tablet: "BE_1LvUPA"
}
  , Fo = ({height: r, id: i, width: s, ...o}) => {
    var m, p;
    return {
        ...o,
        variant: (p = (m = No[o.variant]) !== null && m !== void 0 ? m : o.variant) !== null && p !== void 0 ? p : "P1gAhaWwm"
    }
}
  , Ho = {
    alignment: "center",
    component: rr,
    offset: {
        x: 8,
        y: 8
    },
    placement: "bottom",
    variant: "yt2yRgvlL"
}
  , Io = Re(function(r, i) {
    let {activeLocale: s, setLocale: o} = De()
      , {style: m, className: p, layoutId: h, variant: k, ...g} = Fo(r);
    oe( () => {
        let Y = Gr(void 0, s);
        if (Y.robots) {
            let C = document.querySelector('meta[name="robots"]');
            C ? C.setAttribute("content", Y.robots) : (C = document.createElement("meta"),
            C.setAttribute("name", "robots"),
            C.setAttribute("content", Y.robots),
            document.head.appendChild(C))
        }
    }
    , [void 0, s]),
    da( () => {
        let Y = Gr(void 0, s);
        if (document.title = Y.title || "",
        Y.viewport) {
            var C;
            (C = document.querySelector('meta[name="viewport"]')) === null || C === void 0 || C.setAttribute("content", Y.viewport)
        }
        let E = Y.bodyClassName;
        if (E) {
            let x = document.body;
            x.classList.forEach(H => H.startsWith("framer-body-") && x.classList.remove(H)),
            x.classList.add(`${Y.bodyClassName}-framer-oYeZ4`)
        }
        return () => {
            E && document.body.classList.remove(`${Y.bodyClassName}-framer-oYeZ4`)
        }
    }
    , [void 0, s]);
    let[n,_] = ba(k, uo, !1)
      , w = void 0
      , L = X(null)
      , u = Ve()
      , v = [];
    return ha({
        "1wrypjn": Ho
    }),
    e(ga.Provider, {
        value: {
            primaryVariantId: "P1gAhaWwm",
            variantClassNames: bo
        },
        children: b(pe, {
            id: h ?? u,
            children: [b(O.div, {
                ...g,
                className: Xe(Da, ...v, "framer-xfymdx", p),
                "data-framer-cursor": "1wrypjn",
                ref: i ?? L,
                style: {
                    ...m
                },
                children: [b("div", {
                    className: "framer-1pqmipk",
                    children: [b("div", {
                        className: "framer-1q844k3",
                        children: [e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    height: 40,
                                    width: "40px"
                                },
                                tbgdi9qHR: {
                                    height: 32,
                                    width: "32px"
                                }
                            },
                            children: e(ne, {
                                height: 48,
                                width: "48px",
                                children: e(Ye, {
                                    className: "framer-1x6lpdb-container",
                                    children: e(Zt, {
                                        height: "100%",
                                        id: "hDVSml4ck",
                                        layoutId: "hDVSml4ck",
                                        style: {
                                            height: "100%",
                                            width: "100%"
                                        },
                                        variant: "QbRCp5BO4",
                                        width: "100%"
                                    })
                                })
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tcmVndWxhcg==",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "20px",
                                                "--framer-letter-spacing": "1px",
                                                "--framer-line-height": "100%",
                                                "--framer-text-color": "rgb(255, 255, 255)"
                                            },
                                            children: "Hyper Chan"
                                        })
                                    })
                                },
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tcmVndWxhcg==",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-letter-spacing": "1px",
                                                "--framer-line-height": "100%",
                                                "--framer-text-color": "rgb(255, 255, 255)"
                                            },
                                            children: "Hyper Chan"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tcmVndWxhcg==",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "24px",
                                            "--framer-letter-spacing": "1px",
                                            "--framer-line-height": "100%",
                                            "--framer-text-color": "rgb(255, 255, 255)"
                                        },
                                        children: "Hyper Chan"
                                    })
                                }),
                                className: "framer-1lctmcd",
                                fonts: ["GF;Orbitron-regular"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        })]
                    }), e(f, {
                        breakpoint: n,
                        overrides: {
                            BE_1LvUPA: {
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tcmVndWxhcg==",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "20px",
                                            "--framer-line-height": "100%",
                                            "--framer-text-color": "rgb(255, 255, 255)"
                                        },
                                        children: "The queen of HyperEVM"
                                    })
                                })
                            },
                            tbgdi9qHR: {
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tcmVndWxhcg==",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-line-height": "100%",
                                            "--framer-text-color": "rgb(255, 255, 255)"
                                        },
                                        children: "The queen of HyperEVM"
                                    })
                                })
                            }
                        },
                        children: e(l, {
                            __fromCanvasComponent: !0,
                            children: e(a, {
                                children: e("p", {
                                    style: {
                                        "--font-selector": "R0Y7T3JiaXRyb24tcmVndWxhcg==",
                                        "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                        "--framer-font-size": "24px",
                                        "--framer-line-height": "100%",
                                        "--framer-text-color": "rgb(255, 255, 255)"
                                    },
                                    children: "The queen of HyperEVM"
                                })
                            }),
                            className: "framer-1b7bkkl",
                            fonts: ["GF;Orbitron-regular"],
                            verticalAlignment: "top",
                            withExternalLayout: !0
                        })
                    })]
                }), b("div", {
                    className: "framer-1g86c5c",
                    children: [e(f, {
                        breakpoint: n,
                        overrides: {
                            BE_1LvUPA: {
                                width: "min((100vw - 24px) * 1.2, 1600px)"
                            },
                            tbgdi9qHR: {
                                width: "min((100vw - 16px) * 1.2, 1600px)"
                            }
                        },
                        children: e(ne, {
                            height: 1e3,
                            width: "min((100vw - 32px) * 1.2, 1600px)",
                            children: e(Ye, {
                                className: "framer-1uo980v-container",
                                children: e(rr, {
                                    height: "100%",
                                    id: "dEjvlqQWL",
                                    layoutId: "dEjvlqQWL",
                                    style: {
                                        height: "100%",
                                        maxWidth: "100%",
                                        width: "100%"
                                    },
                                    variant: "NjvQ1dvg2",
                                    width: "100%"
                                })
                            })
                        })
                    }), e("div", {
                        className: "framer-pe4600"
                    }), e(ne, {
                        children: e(Ye, {
                            className: "framer-1c3bapr-container",
                            children: e(Fe, {
                                alignment: "center",
                                direction: "left",
                                fadeOptions: {
                                    fadeAlpha: 0,
                                    fadeContent: !0,
                                    fadeInset: 0,
                                    fadeWidth: 25,
                                    overflow: !1
                                },
                                gap: 10,
                                height: "100%",
                                hoverFactor: 1,
                                id: "fJAUEGjXV",
                                layoutId: "fJAUEGjXV",
                                padding: 10,
                                paddingBottom: 10,
                                paddingLeft: 10,
                                paddingPerSide: !1,
                                paddingRight: 10,
                                paddingTop: 10,
                                sizingOptions: {
                                    heightType: !0,
                                    widthType: !0
                                },
                                slots: [b(O.div, {
                                    className: "framer-12yndkz",
                                    children: [e(l, {
                                        __fromCanvasComponent: !0,
                                        children: e(a, {
                                            children: e("p", {
                                                style: {
                                                    "--font-selector": "R0Y7T3JiaXRyb24tNzAw",
                                                    "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                    "--framer-font-size": "24px",
                                                    "--framer-font-weight": "700",
                                                    "--framer-letter-spacing": "4px",
                                                    "--framer-line-height": "160%",
                                                    "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                                },
                                                children: "$HYPERCHAN"
                                            })
                                        }),
                                        className: "framer-4cvhge",
                                        fonts: ["GF;Orbitron-700"],
                                        verticalAlignment: "top",
                                        withExternalLayout: !0
                                    }), e(l, {
                                        __fromCanvasComponent: !0,
                                        children: e(a, {
                                            children: e("p", {
                                                style: {
                                                    "--font-selector": "R0Y7T3JiaXRyb24tNzAw",
                                                    "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                    "--framer-font-size": "24px",
                                                    "--framer-font-weight": "700",
                                                    "--framer-letter-spacing": "4px",
                                                    "--framer-line-height": "160%",
                                                    "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                                },
                                                children: "$HYPERCHAN"
                                            })
                                        }),
                                        className: "framer-1j5c1l0",
                                        fonts: ["GF;Orbitron-700"],
                                        verticalAlignment: "top",
                                        withExternalLayout: !0
                                    }), e(l, {
                                        __fromCanvasComponent: !0,
                                        children: e(a, {
                                            children: e("p", {
                                                style: {
                                                    "--font-selector": "R0Y7T3JiaXRyb24tNzAw",
                                                    "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                    "--framer-font-size": "24px",
                                                    "--framer-font-weight": "700",
                                                    "--framer-letter-spacing": "4px",
                                                    "--framer-line-height": "160%",
                                                    "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                                },
                                                children: "$HYPERCHAN"
                                            })
                                        }),
                                        className: "framer-1gnspp3",
                                        fonts: ["GF;Orbitron-700"],
                                        verticalAlignment: "top",
                                        withExternalLayout: !0
                                    }), e(l, {
                                        __fromCanvasComponent: !0,
                                        children: e(a, {
                                            children: e("p", {
                                                style: {
                                                    "--font-selector": "R0Y7T3JiaXRyb24tNzAw",
                                                    "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                    "--framer-font-size": "24px",
                                                    "--framer-font-weight": "700",
                                                    "--framer-letter-spacing": "4px",
                                                    "--framer-line-height": "160%",
                                                    "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                                },
                                                children: "$HYPERCHAN"
                                            })
                                        }),
                                        className: "framer-6hycsh",
                                        fonts: ["GF;Orbitron-700"],
                                        verticalAlignment: "top",
                                        withExternalLayout: !0
                                    }), e(l, {
                                        __fromCanvasComponent: !0,
                                        children: e(a, {
                                            children: e("p", {
                                                style: {
                                                    "--font-selector": "R0Y7T3JiaXRyb24tNzAw",
                                                    "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                    "--framer-font-size": "24px",
                                                    "--framer-font-weight": "700",
                                                    "--framer-letter-spacing": "4px",
                                                    "--framer-line-height": "160%",
                                                    "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                                },
                                                children: "$HYPERCHAN"
                                            })
                                        }),
                                        className: "framer-1iyt4qm",
                                        fonts: ["GF;Orbitron-700"],
                                        verticalAlignment: "top",
                                        withExternalLayout: !0
                                    }), e(l, {
                                        __fromCanvasComponent: !0,
                                        children: e(a, {
                                            children: e("p", {
                                                style: {
                                                    "--font-selector": "R0Y7T3JiaXRyb24tNzAw",
                                                    "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                    "--framer-font-size": "24px",
                                                    "--framer-font-weight": "700",
                                                    "--framer-letter-spacing": "4px",
                                                    "--framer-line-height": "160%",
                                                    "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                                },
                                                children: "$HYPERCHAN"
                                            })
                                        }),
                                        className: "framer-16stspt",
                                        fonts: ["GF;Orbitron-700"],
                                        verticalAlignment: "top",
                                        withExternalLayout: !0
                                    }), e(l, {
                                        __fromCanvasComponent: !0,
                                        children: e(a, {
                                            children: e("p", {
                                                style: {
                                                    "--font-selector": "R0Y7T3JiaXRyb24tNzAw",
                                                    "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                    "--framer-font-size": "24px",
                                                    "--framer-font-weight": "700",
                                                    "--framer-letter-spacing": "4px",
                                                    "--framer-line-height": "160%",
                                                    "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                                },
                                                children: "$HYPERCHAN"
                                            })
                                        }),
                                        className: "framer-d0oqx0",
                                        fonts: ["GF;Orbitron-700"],
                                        verticalAlignment: "top",
                                        withExternalLayout: !0
                                    })]
                                })],
                                speed: 64,
                                style: {
                                    height: "100%",
                                    width: "100%"
                                },
                                width: "100%"
                            })
                        })
                    }), e(f, {
                        breakpoint: n,
                        overrides: {
                            BE_1LvUPA: {
                                width: "max(min(100vw - 72px, 1200px), 480px)"
                            },
                            tbgdi9qHR: {
                                width: "max(min(100vw - 48px, 1200px), 480px)"
                            }
                        },
                        children: e(ne, {
                            height: 800,
                            width: "max(min(100vw - 112px, 1200px), 480px)",
                            children: e(Xt, {
                                __framer__loop: wo,
                                __framer__loopEffectEnabled: !0,
                                __framer__loopRepeatDelay: 0,
                                __framer__loopRepeatType: "mirror",
                                __framer__loopTransition: _o,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                className: "framer-1e6yavm-container",
                                children: e(f, {
                                    breakpoint: n,
                                    overrides: {
                                        BE_1LvUPA: {
                                            variant: "DS0xI1e0I"
                                        },
                                        tbgdi9qHR: {
                                            variant: "DS0xI1e0I"
                                        }
                                    },
                                    children: e(Wt, {
                                        height: "100%",
                                        id: "xMGQO3qrq",
                                        layoutId: "xMGQO3qrq",
                                        style: {
                                            height: "100%",
                                            maxWidth: "100%",
                                            width: "100%"
                                        },
                                        variant: "HQlUbiSz0",
                                        width: "100%"
                                    })
                                })
                            })
                        })
                    }), e("div", {
                        className: "framer-1kimt19"
                    }), e("div", {
                        className: "framer-x4w8uy",
                        children: e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "28px",
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "2px",
                                                "--framer-line-height": "144%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "rgb(255, 255, 255)"
                                            },
                                            children: "HyperEVM Takeover"
                                        })
                                    })
                                },
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "20px",
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "2px",
                                                "--framer-line-height": "144%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "rgb(255, 255, 255)"
                                            },
                                            children: "HyperEVM Takeover"
                                        })
                                    })
                                }
                            },
                            children: e(se, {
                                __framer__animate: {
                                    transition: ot
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: Mt,
                                __framer__exit: qt,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __fromCanvasComponent: !0,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "36px",
                                            "--framer-font-weight": "500",
                                            "--framer-letter-spacing": "2px",
                                            "--framer-line-height": "144%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "rgb(255, 255, 255)"
                                        },
                                        children: "HyperEVM Takeover"
                                    })
                                }),
                                className: "framer-phz79i",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        })
                    }), e("div", {
                        className: "framer-iuu62y",
                        children: e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    children: b(a, {
                                        children: [e("p", {
                                            style: {
                                                "--font-selector": "RlM7TW9udHNlcnJhdC1tZWRpdW0=",
                                                "--framer-font-family": '"Montserrat", "Montserrat Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "160%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "rgb(245, 254, 253)"
                                            },
                                            children: '"By the grace of the HyperEVM community, I have been born into this noble realm. Though I am yet in my youth and unrefined, I shall endeavor to treat our community with utmost integrity, guiding HyperEVM to wield boundless influence across the digital dominion. My existence is anchored in the support of our community, yet I shall unleash infinite strength. For the grandeur of HyperEVM, I stand with Jeff as a symbol of leadership, dedicated to the empire we shall build together."'
                                        }), e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tcmVndWxhcg==",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "20px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "rgb(245, 254, 253)"
                                            },
                                            children: e("br", {
                                                className: "trailing-break"
                                            })
                                        }), e("p", {
                                            style: {
                                                "--font-selector": "RlM7TW9udHNlcnJhdC1pdGFsaWM=",
                                                "--framer-font-family": '"Montserrat", "Montserrat Placeholder", sans-serif',
                                                "--framer-font-style": "italic",
                                                "--framer-line-height": "160%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "rgb(245, 254, 253)"
                                            },
                                            children: "- Hyper Chan, The queen of HyperEVM"
                                        })]
                                    })
                                },
                                tbgdi9qHR: {
                                    children: b(a, {
                                        children: [e("p", {
                                            style: {
                                                "--font-selector": "RlM7TW9udHNlcnJhdC1tZWRpdW0=",
                                                "--framer-font-family": '"Montserrat", "Montserrat Placeholder", sans-serif',
                                                "--framer-font-size": "14px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "160%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "rgb(245, 254, 253)"
                                            },
                                            children: '"By the grace of the HyperEVM community, I have been born into this noble realm. Though I am yet in my youth and unrefined, I shall endeavor to treat our community with utmost integrity, guiding HyperEVM to wield boundless influence across the digital dominion. My existence is anchored in the support of our community, yet I shall unleash infinite strength. For the grandeur of HyperEVM, I stand with Jeff as a symbol of leadership, dedicated to the empire we shall build together."'
                                        }), e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tcmVndWxhcg==",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "20px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "rgb(245, 254, 253)"
                                            },
                                            children: e("br", {
                                                className: "trailing-break"
                                            })
                                        }), e("p", {
                                            style: {
                                                "--font-selector": "RlM7TW9udHNlcnJhdC1pdGFsaWM=",
                                                "--framer-font-family": '"Montserrat", "Montserrat Placeholder", sans-serif',
                                                "--framer-font-size": "14px",
                                                "--framer-font-style": "italic",
                                                "--framer-line-height": "160%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "rgb(245, 254, 253)"
                                            },
                                            children: "- Hyper Chan, The queen of HyperEVM"
                                        })]
                                    })
                                }
                            },
                            children: e(se, {
                                __framer__animate: {
                                    transition: ot
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: Mt,
                                __framer__exit: qt,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __fromCanvasComponent: !0,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                children: b(a, {
                                    children: [e("p", {
                                        style: {
                                            "--font-selector": "RlM7TW9udHNlcnJhdC1tZWRpdW0=",
                                            "--framer-font-family": '"Montserrat", "Montserrat Placeholder", sans-serif',
                                            "--framer-font-size": "20px",
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "160%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "rgb(245, 254, 253)"
                                        },
                                        children: '"By the grace of the HyperEVM community, I have been born into this noble realm. Though I am yet in my youth and unrefined, I shall endeavor to treat our community with utmost integrity, guiding HyperEVM to wield boundless influence across the digital dominion. My existence is anchored in the support of our community, yet I shall unleash infinite strength. For the grandeur of HyperEVM, I stand with Jeff as a symbol of leadership, dedicated to the empire we shall build together."'
                                    }), e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tcmVndWxhcg==",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "20px",
                                            "--framer-line-height": "160%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "rgb(245, 254, 253)"
                                        },
                                        children: e("br", {
                                            className: "trailing-break"
                                        })
                                    }), e("p", {
                                        style: {
                                            "--font-selector": "RlM7TW9udHNlcnJhdC1pdGFsaWM=",
                                            "--framer-font-family": '"Montserrat", "Montserrat Placeholder", sans-serif',
                                            "--framer-font-size": "20px",
                                            "--framer-font-style": "italic",
                                            "--framer-line-height": "160%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "rgb(245, 254, 253)"
                                        },
                                        children: "- Hyper Chan, The queen of HyperEVM"
                                    })]
                                }),
                                className: "framer-6z50ix",
                                fonts: ["FS;Montserrat-medium", "GF;Orbitron-regular", "FS;Montserrat-italic"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        })
                    }), b(ge, {
                        __framer__animate: {
                            transition: ot
                        },
                        __framer__animateOnce: !1,
                        __framer__enter: Mt,
                        __framer__exit: qt,
                        __framer__styleAppearEffectEnabled: !0,
                        __framer__threshold: .5,
                        __perspectiveFX: !1,
                        __targetOpacity: 1,
                        className: "framer-xg4obx",
                        children: [e(cr, {
                            href: "https://x.com/HyperEVMChan",
                            nodeId: "H5kHlFB1M",
                            openInNewTab: !0,
                            children: e(O.a, {
                                className: "framer-138qsgj framer-163rb",
                                whileHover: Ir,
                                children: e(ne, {
                                    children: e(Ye, {
                                        className: "framer-1txjzfy-container",
                                        children: e(Le, {
                                            color: "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))",
                                            height: "100%",
                                            iconSearch: "House",
                                            iconSelection: "XLogo",
                                            id: "UkDFFicHK",
                                            layoutId: "UkDFFicHK",
                                            mirrored: !1,
                                            selectByList: !0,
                                            style: {
                                                height: "100%",
                                                width: "100%"
                                            },
                                            weight: "regular",
                                            width: "100%"
                                        })
                                    })
                                })
                            })
                        }), e(cr, {
                            href: "https://t.me/HyperEVMChan",
                            nodeId: "cLlFVA7BV",
                            openInNewTab: !0,
                            children: e(O.a, {
                                className: "framer-zcf0v0 framer-163rb",
                                whileHover: Ir,
                                children: e(ne, {
                                    children: e(Ye, {
                                        className: "framer-1cw92j6-container",
                                        children: e(Le, {
                                            color: "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))",
                                            height: "100%",
                                            iconSearch: "House",
                                            iconSelection: "TelegramLogo",
                                            id: "vXTRlGn5a",
                                            layoutId: "vXTRlGn5a",
                                            mirrored: !1,
                                            selectByList: !0,
                                            style: {
                                                height: "100%",
                                                width: "100%"
                                            },
                                            weight: "regular",
                                            width: "100%"
                                        })
                                    })
                                })
                            })
                        }), e(cr, {
                            href: "https://dexscreener.com/hyperevm/0x3adec2b2774ae7f875ff3daf8436864d234cc69c",
                            nodeId: "Rc_BYg4YG",
                            openInNewTab: !0,
                            children: e(O.a, {
                                className: "framer-1j0df96 framer-163rb",
                                whileHover: Ir,
                                children: e(f, {
                                    breakpoint: n,
                                    overrides: {
                                        BE_1LvUPA: {
                                            svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 41 48"><path d="M 24.701 17.099 C 26.194 16.366 28.093 15.289 29.996 13.812 C 30.397 14.631 30.441 15.346 30.234 15.923 C 30.087 16.33 29.812 16.683 29.449 16.965 C 29.056 17.269 28.565 17.49 28.023 17.61 C 26.993 17.838 25.792 17.705 24.701 17.099 M 24.959 24.6 L 26.936 25.723 C 22.9 27.947 21.803 32.078 20.5 36.1 C 19.197 32.078 18.1 27.947 14.064 25.723 L 16.041 24.6 C 16.433 24.455 16.685 24.077 16.666 23.665 C 16.484 19.898 17.519 18.232 18.914 17.185 C 19.415 16.811 19.961 16.623 20.5 16.623 C 21.039 16.623 21.585 16.811 22.086 17.185 C 23.481 18.232 24.516 19.898 24.335 23.665 C 24.315 24.077 24.567 24.455 24.959 24.6 Z M 20.5 0 C 22.785 0.06 25.075 0.496 27.063 1.345 C 28.439 1.933 29.723 2.71 30.886 3.64 C 31.412 4.059 31.844 4.464 32.32 4.931 C 33.605 4.975 35.483 3.571 36.355 2.258 C 34.854 7.094 28.008 12.806 23.269 14.992 C 23.267 14.991 23.266 14.99 23.264 14.989 C 22.413 14.35 21.457 14.031 20.5 14.031 C 19.543 14.031 18.587 14.35 17.736 14.989 C 17.735 14.99 17.733 14.991 17.731 14.992 C 12.992 12.806 6.146 7.094 4.646 2.258 C 5.517 3.571 7.395 4.975 8.68 4.931 C 9.156 4.465 9.589 4.059 10.114 3.64 C 11.277 2.71 12.561 1.933 13.937 1.345 C 15.925 0.496 18.216 0.06 20.5 0 M 16.299 17.099 C 14.807 16.366 12.907 15.289 11.005 13.812 C 10.604 14.631 10.56 15.346 10.766 15.923 C 10.913 16.33 11.189 16.683 11.551 16.965 C 11.944 17.269 12.435 17.49 12.977 17.61 C 14.007 17.838 15.208 17.705 16.299 17.099" fill="rgb(255,255,255)"></path><path d="M 32.079 12.003 C 33.126 10.963 34.049 9.813 34.79 8.787 L 35.167 9.484 C 36.38 11.871 37.011 14.248 37.011 16.923 L 37.008 21.168 L 37.031 23.369 C 37.119 28.772 38.307 34.238 41 39.24 L 35.366 34.772 L 31.38 41.134 L 27.192 37.257 L 20.5 47.937 L 13.808 37.257 L 9.62 41.134 L 5.634 34.772 L 0 39.24 C 2.693 34.238 3.881 28.772 3.969 23.369 L 3.992 21.168 L 3.99 16.923 C 3.99 14.248 4.62 11.871 5.833 9.484 L 6.21 8.787 C 6.952 9.813 7.874 10.963 8.921 12.003 L 8.594 12.671 C 7.959 13.968 7.749 15.419 8.244 16.799 C 8.563 17.687 9.145 18.449 9.896 19.031 C 10.625 19.596 11.487 19.977 12.39 20.177 C 12.979 20.307 13.578 20.361 14.173 20.342 C 14.035 21.117 13.974 21.92 13.97 22.739 L 8.656 25.757 L 12.757 28.018 C 13.084 28.199 13.396 28.406 13.689 28.637 C 17.07 31.622 19.103 40.454 20.5 44.768 C 21.897 40.454 23.93 31.622 27.311 28.637 C 27.604 28.406 27.916 28.199 28.244 28.018 L 32.345 25.757 L 27.03 22.739 C 27.026 21.92 26.966 21.117 26.827 20.342 C 27.422 20.361 28.022 20.307 28.61 20.177 C 29.513 19.977 30.376 19.596 31.105 19.031 C 31.855 18.449 32.438 17.687 32.757 16.799 C 33.252 15.419 33.041 13.968 32.406 12.671 L 32.079 12.003 Z" fill="rgb(255,255,255)"></path></svg>',
                                            svgContentId: 10326700026
                                        },
                                        tbgdi9qHR: {
                                            svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 30 36"><path d="M 18.074 12.824 C 19.166 12.275 20.556 11.466 21.948 10.359 C 22.241 10.973 22.274 11.509 22.122 11.942 C 22.015 12.247 21.813 12.513 21.548 12.724 C 21.26 12.952 20.901 13.118 20.504 13.208 C 19.751 13.379 18.872 13.279 18.074 12.824 M 18.263 18.45 L 19.709 19.292 C 16.756 20.961 15.954 24.058 15 27.075 C 14.047 24.058 13.244 20.961 10.291 19.292 L 11.737 18.45 C 12.024 18.341 12.209 18.058 12.194 17.749 C 12.062 14.923 12.819 13.674 13.84 12.889 C 14.206 12.608 14.606 12.467 15 12.467 C 15.394 12.467 15.794 12.608 16.16 12.889 C 17.181 13.674 17.938 14.923 17.806 17.749 C 17.791 18.058 17.976 18.341 18.263 18.45 Z M 15 0 C 16.672 0.045 18.348 0.372 19.802 1.009 C 20.809 1.45 21.749 2.033 22.6 2.73 C 22.984 3.044 23.3 3.348 23.649 3.698 C 24.589 3.731 25.963 2.678 26.601 1.693 C 25.503 5.321 20.494 9.605 17.026 11.244 C 17.025 11.243 17.024 11.242 17.023 11.242 C 16.4 10.763 15.7 10.523 15 10.523 C 14.3 10.523 13.6 10.763 12.978 11.242 C 12.977 11.242 12.976 11.243 12.974 11.244 C 9.506 9.605 4.497 5.321 3.399 1.693 C 4.037 2.678 5.411 3.731 6.351 3.698 C 6.7 3.348 7.016 3.044 7.4 2.73 C 8.251 2.033 9.191 1.45 10.198 1.009 C 11.653 0.372 13.328 0.045 15 0 M 11.926 12.824 C 10.834 12.275 9.444 11.466 8.052 10.359 C 7.759 10.973 7.727 11.509 7.878 11.942 C 7.985 12.247 8.187 12.513 8.452 12.724 C 8.74 12.952 9.099 13.118 9.496 13.208 C 10.249 13.379 11.128 13.279 11.926 12.824" fill="rgb(255,255,255)"></path><path d="M 23.472 9.002 C 24.238 8.223 24.914 7.36 25.456 6.59 L 25.732 7.113 C 26.62 8.903 27.081 10.686 27.081 12.692 L 27.079 15.876 L 27.096 17.527 C 27.16 21.579 28.03 25.678 30 29.43 L 25.878 26.079 L 22.961 30.85 L 19.897 27.943 L 15 35.952 L 10.103 27.943 L 7.039 30.85 L 4.122 26.079 L 0 29.43 C 1.97 25.678 2.84 21.579 2.904 17.527 L 2.921 15.876 L 2.919 12.693 C 2.919 10.686 3.38 8.903 4.268 7.113 L 4.544 6.59 C 5.087 7.36 5.762 8.223 6.528 9.002 L 6.289 9.503 C 5.824 10.476 5.67 11.564 6.032 12.599 C 6.265 13.265 6.691 13.837 7.241 14.273 C 7.774 14.697 8.405 14.983 9.066 15.133 C 9.497 15.23 9.935 15.27 10.371 15.257 C 10.269 15.838 10.225 16.44 10.222 17.054 L 6.333 19.318 L 9.334 21.014 C 9.574 21.149 9.802 21.304 10.017 21.478 C 12.491 23.717 13.978 30.34 15 33.576 C 16.022 30.34 17.51 23.717 19.984 21.478 C 20.198 21.304 20.426 21.149 20.666 21.014 L 23.667 19.318 L 19.778 17.054 C 19.775 16.44 19.731 15.838 19.629 15.257 C 20.065 15.27 20.504 15.23 20.934 15.133 C 21.595 14.983 22.226 14.697 22.76 14.273 C 23.309 13.837 23.735 13.265 23.968 12.599 C 24.33 11.564 24.176 10.476 23.712 9.503 L 23.472 9.002 Z" fill="rgb(255,255,255)"></path></svg>',
                                            svgContentId: 9155930212
                                        }
                                    },
                                    children: e(wa, {
                                        className: "framer-5sp023",
                                        "data-framer-name": "Dex-screener-seeklogo",
                                        layout: "position",
                                        name: "Dex-screener-seeklogo",
                                        opacity: 1,
                                        svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 54 64"><path d="M 32.532 22.798 C 34.499 21.822 37.001 20.385 39.506 18.416 C 40.035 19.508 40.092 20.461 39.82 21.231 C 39.627 21.773 39.264 22.244 38.786 22.62 C 38.269 23.025 37.622 23.321 36.908 23.48 C 35.552 23.784 33.97 23.607 32.532 22.798 M 32.873 32.8 L 35.477 34.297 C 30.161 37.263 28.716 42.77 27 48.134 C 25.284 42.77 23.839 37.263 18.524 34.297 L 21.127 32.8 C 21.643 32.606 21.976 32.103 21.95 31.553 C 21.711 26.53 23.074 24.309 24.911 22.914 C 25.571 22.414 26.29 22.163 27 22.163 C 27.71 22.163 28.43 22.414 29.089 22.914 C 30.927 24.309 32.289 26.53 32.051 31.553 C 32.025 32.103 32.357 32.606 32.873 32.8 Z M 27 0 C 30.009 0.08 33.026 0.662 35.643 1.793 C 37.456 2.578 39.148 3.614 40.68 4.853 C 41.371 5.412 41.941 5.953 42.568 6.575 C 44.261 6.633 46.734 4.761 47.882 3.01 C 45.906 9.459 36.889 17.075 30.647 19.989 C 30.644 19.988 30.642 19.987 30.64 19.985 C 29.52 19.134 28.26 18.708 27 18.708 C 25.74 18.708 24.48 19.134 23.36 19.985 C 23.358 19.986 23.356 19.988 23.353 19.989 C 17.111 17.075 8.094 9.459 6.118 3.01 C 7.266 4.761 9.739 6.633 11.432 6.575 C 12.059 5.953 12.629 5.412 13.32 4.853 C 14.852 3.614 16.544 2.578 18.357 1.793 C 20.975 0.662 23.991 0.08 27 0 M 21.468 22.798 C 19.501 21.822 16.999 20.385 14.494 18.416 C 13.966 19.508 13.908 20.461 14.18 21.231 C 14.373 21.773 14.736 22.244 15.214 22.62 C 15.732 23.025 16.378 23.321 17.092 23.48 C 18.448 23.784 20.03 23.607 21.468 22.798" fill="rgb(255,255,255)"></path><path d="M 42.25 16.003 C 43.629 14.618 44.844 13.084 45.822 11.716 L 46.318 12.646 C 47.916 15.828 48.746 18.997 48.746 22.564 L 48.742 28.224 L 48.772 31.159 C 48.888 38.362 50.454 45.65 54 52.32 L 46.58 46.363 L 41.33 54.845 L 35.814 49.676 L 27 63.916 L 18.186 49.676 L 12.67 54.845 L 7.42 46.363 L 0 52.32 C 3.546 45.65 5.112 38.362 5.228 31.159 L 5.258 28.225 L 5.255 22.564 C 5.255 18.997 6.084 15.828 7.683 12.646 L 8.179 11.716 C 9.156 13.084 10.371 14.618 11.75 16.004 L 11.319 16.894 C 10.483 18.624 10.206 20.559 10.857 22.398 C 11.278 23.583 12.045 24.599 13.033 25.375 C 13.993 26.128 15.129 26.636 16.319 26.902 C 17.094 27.076 17.883 27.148 18.668 27.123 C 18.485 28.156 18.405 29.227 18.399 30.319 L 11.4 34.343 L 16.801 37.357 C 17.233 37.598 17.644 37.874 18.03 38.183 C 22.483 42.163 25.16 53.939 27 59.69 C 28.84 53.939 31.517 42.163 35.971 38.183 C 36.357 37.874 36.768 37.598 37.199 37.357 L 42.601 34.343 L 35.601 30.319 C 35.596 29.227 35.516 28.156 35.333 27.123 C 36.117 27.148 36.907 27.076 37.681 26.902 C 38.871 26.636 40.007 26.128 40.967 25.375 C 41.956 24.599 42.723 23.583 43.143 22.398 C 43.795 20.559 43.518 18.624 42.681 16.894 L 42.25 16.004 Z" fill="rgb(255,255,255)"></path></svg>',
                                        svgContentId: 10774646908,
                                        withExternalLayout: !0
                                    })
                                })
                            })
                        })]
                    })]
                }), e(ne, {
                    children: e(Ye, {
                        className: "framer-tb2k4l-container",
                        children: e(Fe, {
                            alignment: "center",
                            direction: "left",
                            fadeOptions: {
                                fadeAlpha: 0,
                                fadeContent: !0,
                                fadeInset: 0,
                                fadeWidth: 25,
                                overflow: !1
                            },
                            gap: 10,
                            height: "100%",
                            hoverFactor: 1,
                            id: "vmxw_F7V6",
                            layoutId: "vmxw_F7V6",
                            padding: 10,
                            paddingBottom: 10,
                            paddingLeft: 10,
                            paddingPerSide: !1,
                            paddingRight: 10,
                            paddingTop: 10,
                            sizingOptions: {
                                heightType: !0,
                                widthType: !0
                            },
                            slots: [b(O.div, {
                                className: "framer-19o8mp9",
                                children: [e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-yibb0b",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                }), e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-1c4362k",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                }), e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-1p3zl87",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                }), e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-t1j2gt",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                }), e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-o1etyc",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                }), e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-vmtilf",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                }), e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-1f5czy2",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                }), e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-1ucxv5u",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                })]
                            })],
                            speed: 64,
                            style: {
                                height: "100%",
                                width: "100%"
                            },
                            width: "100%"
                        })
                    })
                }), b(Hr, {
                    animate: Er,
                    className: "framer-1i8jm4o",
                    "data-framer-appear-id": "1i8jm4o",
                    initial: zr,
                    optimized: !0,
                    children: [e(f, {
                        breakpoint: n,
                        overrides: {
                            BE_1LvUPA: {
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "20px",
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "160%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "rgb(255, 255, 255)"
                                        },
                                        children: "Legendary Scenes "
                                    })
                                })
                            },
                            tbgdi9qHR: {
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "160%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "rgb(255, 255, 255)"
                                        },
                                        children: "Legendary Scenes "
                                    })
                                })
                            }
                        },
                        children: e(l, {
                            __fromCanvasComponent: !0,
                            children: e(a, {
                                children: e("p", {
                                    style: {
                                        "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                        "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                        "--framer-font-size": "24px",
                                        "--framer-font-weight": "500",
                                        "--framer-line-height": "160%",
                                        "--framer-text-alignment": "center",
                                        "--framer-text-color": "rgb(255, 255, 255)"
                                    },
                                    children: "Legendary Scenes "
                                })
                            }),
                            className: "framer-3jmomq",
                            fonts: ["GF;Orbitron-500"],
                            verticalAlignment: "top",
                            withExternalLayout: !0
                        })
                    }), e("div", {
                        className: "framer-dn9trr"
                    }), b("div", {
                        className: "framer-10kogrx",
                        children: [e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 2295,
                                        intrinsicWidth: 4e3,
                                        pixelHeight: 2295,
                                        pixelWidth: 4e3,
                                        sizes: "min((100vw - 24px) * 1.5597, 1920px)",
                                        src: "./framerusercontent.com/images/84BtteePyUh0m0Pde0ImCQt4.png",
                                        srcSet: "./framerusercontent.com/images/84BtteePyUh0m0Pde0ImCQt4.png?scale-down-to=512 512w,./framerusercontent.com/images/84BtteePyUh0m0Pde0ImCQt4.png?scale-down-to=1024 1024w,./framerusercontent.com/images/84BtteePyUh0m0Pde0ImCQt4.png?scale-down-to=2048 2048w,./framerusercontent.com/images/84BtteePyUh0m0Pde0ImCQt4.png 4000w"
                                    }
                                },
                                tbgdi9qHR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 2295,
                                        intrinsicWidth: 4e3,
                                        pixelHeight: 2295,
                                        pixelWidth: 4e3,
                                        sizes: "min((100vw - 16px) * 1.6791, 1920px)",
                                        src: "./framerusercontent.com/images/84BtteePyUh0m0Pde0ImCQt4.png",
                                        srcSet: "./framerusercontent.com/images/84BtteePyUh0m0Pde0ImCQt4.png?scale-down-to=512 512w,./framerusercontent.com/images/84BtteePyUh0m0Pde0ImCQt4.png?scale-down-to=1024 1024w,./framerusercontent.com/images/84BtteePyUh0m0Pde0ImCQt4.png?scale-down-to=2048 2048w,./framerusercontent.com/images/84BtteePyUh0m0Pde0ImCQt4.png 4000w"
                                    }
                                }
                            },
                            children: e(S, {
                                __framer__animate: {
                                    transition: Qa
                                },
                                __framer__animateOnce: !0,
                                __framer__enter: nt,
                                __framer__exit: ko,
                                __framer__loop: Ro,
                                __framer__loopEffectEnabled: !0,
                                __framer__loopRepeatDelay: 0,
                                __framer__loopRepeatType: "mirror",
                                __framer__loopTransition: Co,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 2295,
                                    intrinsicWidth: 4e3,
                                    pixelHeight: 2295,
                                    pixelWidth: 4e3,
                                    sizes: "min((100vw - 32px) * 1.4397, 1920px)",
                                    src: "./framerusercontent.com/images/84BtteePyUh0m0Pde0ImCQt4.png",
                                    srcSet: "./framerusercontent.com/images/84BtteePyUh0m0Pde0ImCQt4.png?scale-down-to=512 512w,./framerusercontent.com/images/84BtteePyUh0m0Pde0ImCQt4.png?scale-down-to=1024 1024w,./framerusercontent.com/images/84BtteePyUh0m0Pde0ImCQt4.png?scale-down-to=2048 2048w,./framerusercontent.com/images/84BtteePyUh0m0Pde0ImCQt4.png 4000w"
                                },
                                className: "framer-13qstjm",
                                "data-framer-name": "Scene back",
                                name: "Scene back"
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 2295,
                                        intrinsicWidth: 4e3,
                                        pixelHeight: 2295,
                                        pixelWidth: 4e3,
                                        sizes: "min((100vw - 24px) * 1.5597, 1920px)",
                                        src: "./framerusercontent.com/images/idVd1L8f9KgVIpXUjJ3qPZJMa6o.png",
                                        srcSet: "./framerusercontent.com/images/idVd1L8f9KgVIpXUjJ3qPZJMa6o.png?scale-down-to=512 512w,./framerusercontent.com/images/idVd1L8f9KgVIpXUjJ3qPZJMa6o.png?scale-down-to=1024 1024w,./framerusercontent.com/images/idVd1L8f9KgVIpXUjJ3qPZJMa6o.png?scale-down-to=2048 2048w,./framerusercontent.com/images/idVd1L8f9KgVIpXUjJ3qPZJMa6o.png 4000w"
                                    }
                                },
                                tbgdi9qHR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 2295,
                                        intrinsicWidth: 4e3,
                                        pixelHeight: 2295,
                                        pixelWidth: 4e3,
                                        sizes: "min((100vw - 16px) * 1.6791, 1920px)",
                                        src: "./framerusercontent.com/images/idVd1L8f9KgVIpXUjJ3qPZJMa6o.png",
                                        srcSet: "./framerusercontent.com/images/idVd1L8f9KgVIpXUjJ3qPZJMa6o.png?scale-down-to=512 512w,./framerusercontent.com/images/idVd1L8f9KgVIpXUjJ3qPZJMa6o.png?scale-down-to=1024 1024w,./framerusercontent.com/images/idVd1L8f9KgVIpXUjJ3qPZJMa6o.png?scale-down-to=2048 2048w,./framerusercontent.com/images/idVd1L8f9KgVIpXUjJ3qPZJMa6o.png 4000w"
                                    }
                                }
                            },
                            children: e(S, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !0,
                                __framer__enter: nt,
                                __framer__exit: jt,
                                __framer__loop: So,
                                __framer__loopEffectEnabled: !0,
                                __framer__loopRepeatDelay: 0,
                                __framer__loopRepeatType: "mirror",
                                __framer__loopTransition: Vt,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 2295,
                                    intrinsicWidth: 4e3,
                                    pixelHeight: 2295,
                                    pixelWidth: 4e3,
                                    sizes: "min((100vw - 32px) * 1.4397, 1920px)",
                                    src: "./framerusercontent.com/images/idVd1L8f9KgVIpXUjJ3qPZJMa6o.png",
                                    srcSet: "./framerusercontent.com/images/idVd1L8f9KgVIpXUjJ3qPZJMa6o.png?scale-down-to=512 512w,./framerusercontent.com/images/idVd1L8f9KgVIpXUjJ3qPZJMa6o.png?scale-down-to=1024 1024w,./framerusercontent.com/images/idVd1L8f9KgVIpXUjJ3qPZJMa6o.png?scale-down-to=2048 2048w,./framerusercontent.com/images/idVd1L8f9KgVIpXUjJ3qPZJMa6o.png 4000w"
                                },
                                className: "framer-1r0laeg",
                                "data-framer-name": "Scene HL",
                                name: "Scene HL"
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 2295,
                                        intrinsicWidth: 4e3,
                                        pixelHeight: 2295,
                                        pixelWidth: 4e3,
                                        sizes: "min((100vw - 24px) * 1.5597, 1920px)",
                                        src: "./framerusercontent.com/images/MTkVGksWgMPcnLuSRdSyoD3nba0.png",
                                        srcSet: "./framerusercontent.com/images/MTkVGksWgMPcnLuSRdSyoD3nba0.png?scale-down-to=512 512w,./framerusercontent.com/images/MTkVGksWgMPcnLuSRdSyoD3nba0.png?scale-down-to=1024 1024w,./framerusercontent.com/images/MTkVGksWgMPcnLuSRdSyoD3nba0.png?scale-down-to=2048 2048w,./framerusercontent.com/images/MTkVGksWgMPcnLuSRdSyoD3nba0.png 4000w"
                                    }
                                },
                                tbgdi9qHR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 2295,
                                        intrinsicWidth: 4e3,
                                        pixelHeight: 2295,
                                        pixelWidth: 4e3,
                                        sizes: "min((100vw - 16px) * 1.6791, 1920px)",
                                        src: "./framerusercontent.com/images/MTkVGksWgMPcnLuSRdSyoD3nba0.png",
                                        srcSet: "./framerusercontent.com/images/MTkVGksWgMPcnLuSRdSyoD3nba0.png?scale-down-to=512 512w,./framerusercontent.com/images/MTkVGksWgMPcnLuSRdSyoD3nba0.png?scale-down-to=1024 1024w,./framerusercontent.com/images/MTkVGksWgMPcnLuSRdSyoD3nba0.png?scale-down-to=2048 2048w,./framerusercontent.com/images/MTkVGksWgMPcnLuSRdSyoD3nba0.png 4000w"
                                    }
                                }
                            },
                            children: e(S, {
                                __framer__animate: {
                                    transition: Dt
                                },
                                __framer__animateOnce: !0,
                                __framer__enter: it,
                                __framer__exit: Ja,
                                __framer__loop: Oo,
                                __framer__loopEffectEnabled: !0,
                                __framer__loopRepeatDelay: 0,
                                __framer__loopRepeatType: "mirror",
                                __framer__loopTransition: Ao,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 2295,
                                    intrinsicWidth: 4e3,
                                    pixelHeight: 2295,
                                    pixelWidth: 4e3,
                                    sizes: "min((100vw - 32px) * 1.4397, 1920px)",
                                    src: "./framerusercontent.com/images/MTkVGksWgMPcnLuSRdSyoD3nba0.png",
                                    srcSet: "./framerusercontent.com/images/MTkVGksWgMPcnLuSRdSyoD3nba0.png?scale-down-to=512 512w,./framerusercontent.com/images/MTkVGksWgMPcnLuSRdSyoD3nba0.png?scale-down-to=1024 1024w,./framerusercontent.com/images/MTkVGksWgMPcnLuSRdSyoD3nba0.png?scale-down-to=2048 2048w,./framerusercontent.com/images/MTkVGksWgMPcnLuSRdSyoD3nba0.png 4000w"
                                },
                                className: "framer-1neybzu",
                                "data-framer-name": "Scene PURR",
                                name: "Scene PURR"
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 2295,
                                        intrinsicWidth: 4e3,
                                        pixelHeight: 2295,
                                        pixelWidth: 4e3,
                                        sizes: "min((100vw - 24px) * 1.5597, 1920px)",
                                        src: "./framerusercontent.com/images/9qnFoe8XOMlyOLvFTIgED3x1Wo.png",
                                        srcSet: "./framerusercontent.com/images/9qnFoe8XOMlyOLvFTIgED3x1Wo.png?scale-down-to=512 512w,./framerusercontent.com/images/9qnFoe8XOMlyOLvFTIgED3x1Wo.png?scale-down-to=1024 1024w,./framerusercontent.com/images/9qnFoe8XOMlyOLvFTIgED3x1Wo.png?scale-down-to=2048 2048w,./framerusercontent.com/images/9qnFoe8XOMlyOLvFTIgED3x1Wo.png 4000w"
                                    }
                                },
                                tbgdi9qHR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 2295,
                                        intrinsicWidth: 4e3,
                                        pixelHeight: 2295,
                                        pixelWidth: 4e3,
                                        sizes: "min((100vw - 16px) * 1.6791, 1920px)",
                                        src: "./framerusercontent.com/images/9qnFoe8XOMlyOLvFTIgED3x1Wo.png",
                                        srcSet: "./framerusercontent.com/images/9qnFoe8XOMlyOLvFTIgED3x1Wo.png?scale-down-to=512 512w,./framerusercontent.com/images/9qnFoe8XOMlyOLvFTIgED3x1Wo.png?scale-down-to=1024 1024w,./framerusercontent.com/images/9qnFoe8XOMlyOLvFTIgED3x1Wo.png?scale-down-to=2048 2048w,./framerusercontent.com/images/9qnFoe8XOMlyOLvFTIgED3x1Wo.png 4000w"
                                    }
                                }
                            },
                            children: e(S, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !0,
                                __framer__enter: nt,
                                __framer__exit: jt,
                                __framer__loop: Lo,
                                __framer__loopEffectEnabled: !0,
                                __framer__loopRepeatDelay: 0,
                                __framer__loopRepeatType: "mirror",
                                __framer__loopTransition: Yo,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 2295,
                                    intrinsicWidth: 4e3,
                                    pixelHeight: 2295,
                                    pixelWidth: 4e3,
                                    sizes: "min((100vw - 32px) * 1.4397, 1920px)",
                                    src: "./framerusercontent.com/images/9qnFoe8XOMlyOLvFTIgED3x1Wo.png",
                                    srcSet: "./framerusercontent.com/images/9qnFoe8XOMlyOLvFTIgED3x1Wo.png?scale-down-to=512 512w,./framerusercontent.com/images/9qnFoe8XOMlyOLvFTIgED3x1Wo.png?scale-down-to=1024 1024w,./framerusercontent.com/images/9qnFoe8XOMlyOLvFTIgED3x1Wo.png?scale-down-to=2048 2048w,./framerusercontent.com/images/9qnFoe8XOMlyOLvFTIgED3x1Wo.png 4000w"
                                },
                                className: "framer-1ri45bd",
                                "data-framer-name": "Scene LQNA",
                                name: "Scene LQNA"
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 2295,
                                        intrinsicWidth: 4e3,
                                        pixelHeight: 2295,
                                        pixelWidth: 4e3,
                                        sizes: "min((100vw - 24px) * 1.5597, 1920px)",
                                        src: "./framerusercontent.com/images/5zbDzvdkXEBQTjTLJ6Qe8MZzM.png",
                                        srcSet: "./framerusercontent.com/images/5zbDzvdkXEBQTjTLJ6Qe8MZzM.png?scale-down-to=512 512w,./framerusercontent.com/images/5zbDzvdkXEBQTjTLJ6Qe8MZzM.png?scale-down-to=1024 1024w,./framerusercontent.com/images/5zbDzvdkXEBQTjTLJ6Qe8MZzM.png?scale-down-to=2048 2048w,./framerusercontent.com/images/5zbDzvdkXEBQTjTLJ6Qe8MZzM.png 4000w"
                                    }
                                },
                                tbgdi9qHR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 2295,
                                        intrinsicWidth: 4e3,
                                        pixelHeight: 2295,
                                        pixelWidth: 4e3,
                                        sizes: "min((100vw - 16px) * 1.6791, 1920px)",
                                        src: "./framerusercontent.com/images/5zbDzvdkXEBQTjTLJ6Qe8MZzM.png",
                                        srcSet: "./framerusercontent.com/images/5zbDzvdkXEBQTjTLJ6Qe8MZzM.png?scale-down-to=512 512w,./framerusercontent.com/images/5zbDzvdkXEBQTjTLJ6Qe8MZzM.png?scale-down-to=1024 1024w,./framerusercontent.com/images/5zbDzvdkXEBQTjTLJ6Qe8MZzM.png?scale-down-to=2048 2048w,./framerusercontent.com/images/5zbDzvdkXEBQTjTLJ6Qe8MZzM.png 4000w"
                                    }
                                }
                            },
                            children: e(S, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !0,
                                __framer__enter: nt,
                                __framer__exit: jt,
                                __framer__loop: To,
                                __framer__loopEffectEnabled: !0,
                                __framer__loopRepeatDelay: 0,
                                __framer__loopRepeatType: "mirror",
                                __framer__loopTransition: Vt,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 2295,
                                    intrinsicWidth: 4e3,
                                    pixelHeight: 2295,
                                    pixelWidth: 4e3,
                                    sizes: "min((100vw - 32px) * 1.4397, 1920px)",
                                    src: "./framerusercontent.com/images/5zbDzvdkXEBQTjTLJ6Qe8MZzM.png",
                                    srcSet: "./framerusercontent.com/images/5zbDzvdkXEBQTjTLJ6Qe8MZzM.png?scale-down-to=512 512w,./framerusercontent.com/images/5zbDzvdkXEBQTjTLJ6Qe8MZzM.png?scale-down-to=1024 1024w,./framerusercontent.com/images/5zbDzvdkXEBQTjTLJ6Qe8MZzM.png?scale-down-to=2048 2048w,./framerusercontent.com/images/5zbDzvdkXEBQTjTLJ6Qe8MZzM.png 4000w"
                                },
                                className: "framer-s9rwda",
                                "data-framer-name": "Scene Hfun",
                                name: "Scene Hfun"
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 2295,
                                        intrinsicWidth: 4e3,
                                        pixelHeight: 2295,
                                        pixelWidth: 4e3,
                                        sizes: "min((100vw - 24px) * 1.5597, 1920px)",
                                        src: "./framerusercontent.com/images/j4Uk5KObmRCiO6SZHyIh9WPN60.png",
                                        srcSet: "./framerusercontent.com/images/j4Uk5KObmRCiO6SZHyIh9WPN60.png?scale-down-to=512 512w,./framerusercontent.com/images/j4Uk5KObmRCiO6SZHyIh9WPN60.png?scale-down-to=1024 1024w,./framerusercontent.com/images/j4Uk5KObmRCiO6SZHyIh9WPN60.png?scale-down-to=2048 2048w,./framerusercontent.com/images/j4Uk5KObmRCiO6SZHyIh9WPN60.png 4000w"
                                    }
                                },
                                tbgdi9qHR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 2295,
                                        intrinsicWidth: 4e3,
                                        pixelHeight: 2295,
                                        pixelWidth: 4e3,
                                        sizes: "min((100vw - 16px) * 1.6791, 1920px)",
                                        src: "./framerusercontent.com/images/j4Uk5KObmRCiO6SZHyIh9WPN60.png",
                                        srcSet: "./framerusercontent.com/images/j4Uk5KObmRCiO6SZHyIh9WPN60.png?scale-down-to=512 512w,./framerusercontent.com/images/j4Uk5KObmRCiO6SZHyIh9WPN60.png?scale-down-to=1024 1024w,./framerusercontent.com/images/j4Uk5KObmRCiO6SZHyIh9WPN60.png?scale-down-to=2048 2048w,./framerusercontent.com/images/j4Uk5KObmRCiO6SZHyIh9WPN60.png 4000w"
                                    }
                                }
                            },
                            children: e(S, {
                                __framer__animate: {
                                    transition: Dt
                                },
                                __framer__animateOnce: !0,
                                __framer__enter: it,
                                __framer__exit: Ja,
                                __framer__loop: Po,
                                __framer__loopEffectEnabled: !0,
                                __framer__loopRepeatDelay: 0,
                                __framer__loopRepeatType: "mirror",
                                __framer__loopTransition: Vt,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 2295,
                                    intrinsicWidth: 4e3,
                                    pixelHeight: 2295,
                                    pixelWidth: 4e3,
                                    sizes: "min((100vw - 32px) * 1.4397, 1920px)",
                                    src: "./framerusercontent.com/images/j4Uk5KObmRCiO6SZHyIh9WPN60.png",
                                    srcSet: "./framerusercontent.com/images/j4Uk5KObmRCiO6SZHyIh9WPN60.png?scale-down-to=512 512w,./framerusercontent.com/images/j4Uk5KObmRCiO6SZHyIh9WPN60.png?scale-down-to=1024 1024w,./framerusercontent.com/images/j4Uk5KObmRCiO6SZHyIh9WPN60.png?scale-down-to=2048 2048w,./framerusercontent.com/images/j4Uk5KObmRCiO6SZHyIh9WPN60.png 4000w"
                                },
                                className: "framer-2g9oob",
                                "data-framer-name": "Scene Catbal",
                                name: "Scene Catbal"
                            })
                        }), e("div", {
                            className: "framer-1oi1wyi"
                        })]
                    }), b("div", {
                        className: "framer-pplf7w",
                        children: [e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 56px, 1440px) - 16px) / 3, 50px)",
                                        src: "./framerusercontent.com/images/fKBcAMhK496oE7fX7y5e1Jf3I.png",
                                        srcSet: "./framerusercontent.com/images/fKBcAMhK496oE7fX7y5e1Jf3I.png?scale-down-to=512 512w,./framerusercontent.com/images/fKBcAMhK496oE7fX7y5e1Jf3I.png?scale-down-to=1024 1024w,./framerusercontent.com/images/fKBcAMhK496oE7fX7y5e1Jf3I.png 1500w"
                                    }
                                },
                                tbgdi9qHR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 32px, 1440px) - 8px) / 2, 50px)",
                                        src: "./framerusercontent.com/images/fKBcAMhK496oE7fX7y5e1Jf3I.png",
                                        srcSet: "./framerusercontent.com/images/fKBcAMhK496oE7fX7y5e1Jf3I.png?scale-down-to=512 512w,./framerusercontent.com/images/fKBcAMhK496oE7fX7y5e1Jf3I.png?scale-down-to=1024 1024w,./framerusercontent.com/images/fKBcAMhK496oE7fX7y5e1Jf3I.png 1500w"
                                    }
                                }
                            },
                            children: e(S, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: P,
                                __framer__exit: N,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "max((min(100vw - 80px, 1440px) - 24px) / 4, 50px)",
                                    src: "./framerusercontent.com/images/fKBcAMhK496oE7fX7y5e1Jf3I.png",
                                    srcSet: "./framerusercontent.com/images/fKBcAMhK496oE7fX7y5e1Jf3I.png?scale-down-to=512 512w,./framerusercontent.com/images/fKBcAMhK496oE7fX7y5e1Jf3I.png?scale-down-to=1024 1024w,./framerusercontent.com/images/fKBcAMhK496oE7fX7y5e1Jf3I.png 1500w"
                                },
                                className: "framer-190xuip",
                                "data-border": !0,
                                "data-framer-name": "Lqna 01",
                                name: "Lqna 01"
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 56px, 1440px) - 16px) / 3, 50px)",
                                        src: "./framerusercontent.com/images/NBmF8ypdMUz1YNQ2PQtwoagonjI.png",
                                        srcSet: "./framerusercontent.com/images/NBmF8ypdMUz1YNQ2PQtwoagonjI.png?scale-down-to=512 512w,./framerusercontent.com/images/NBmF8ypdMUz1YNQ2PQtwoagonjI.png?scale-down-to=1024 1024w,./framerusercontent.com/images/NBmF8ypdMUz1YNQ2PQtwoagonjI.png 1500w"
                                    }
                                },
                                tbgdi9qHR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 32px, 1440px) - 8px) / 2, 50px)",
                                        src: "./framerusercontent.com/images/NBmF8ypdMUz1YNQ2PQtwoagonjI.png",
                                        srcSet: "./framerusercontent.com/images/NBmF8ypdMUz1YNQ2PQtwoagonjI.png?scale-down-to=512 512w,./framerusercontent.com/images/NBmF8ypdMUz1YNQ2PQtwoagonjI.png?scale-down-to=1024 1024w,./framerusercontent.com/images/NBmF8ypdMUz1YNQ2PQtwoagonjI.png 1500w"
                                    }
                                }
                            },
                            children: e(S, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: P,
                                __framer__exit: N,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "max((min(100vw - 80px, 1440px) - 24px) / 4, 50px)",
                                    src: "./framerusercontent.com/images/NBmF8ypdMUz1YNQ2PQtwoagonjI.png",
                                    srcSet: "./framerusercontent.com/images/NBmF8ypdMUz1YNQ2PQtwoagonjI.png?scale-down-to=512 512w,./framerusercontent.com/images/NBmF8ypdMUz1YNQ2PQtwoagonjI.png?scale-down-to=1024 1024w,./framerusercontent.com/images/NBmF8ypdMUz1YNQ2PQtwoagonjI.png 1500w"
                                },
                                className: "framer-103d0zo",
                                "data-border": !0,
                                "data-framer-name": "Lqna 02",
                                name: "Lqna 02"
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 56px, 1440px) - 16px) / 3, 50px)",
                                        src: "./framerusercontent.com/images/O9CdWxu2jWYocaIjJfI8RaWbCMg.png",
                                        srcSet: "./framerusercontent.com/images/O9CdWxu2jWYocaIjJfI8RaWbCMg.png?scale-down-to=512 512w,./framerusercontent.com/images/O9CdWxu2jWYocaIjJfI8RaWbCMg.png?scale-down-to=1024 1024w,./framerusercontent.com/images/O9CdWxu2jWYocaIjJfI8RaWbCMg.png 1500w"
                                    }
                                },
                                tbgdi9qHR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 32px, 1440px) - 8px) / 2, 50px)",
                                        src: "./framerusercontent.com/images/O9CdWxu2jWYocaIjJfI8RaWbCMg.png",
                                        srcSet: "./framerusercontent.com/images/O9CdWxu2jWYocaIjJfI8RaWbCMg.png?scale-down-to=512 512w,./framerusercontent.com/images/O9CdWxu2jWYocaIjJfI8RaWbCMg.png?scale-down-to=1024 1024w,./framerusercontent.com/images/O9CdWxu2jWYocaIjJfI8RaWbCMg.png 1500w"
                                    }
                                }
                            },
                            children: e(S, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: P,
                                __framer__exit: N,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "max((min(100vw - 80px, 1440px) - 24px) / 4, 50px)",
                                    src: "./framerusercontent.com/images/O9CdWxu2jWYocaIjJfI8RaWbCMg.png",
                                    srcSet: "./framerusercontent.com/images/O9CdWxu2jWYocaIjJfI8RaWbCMg.png?scale-down-to=512 512w,./framerusercontent.com/images/O9CdWxu2jWYocaIjJfI8RaWbCMg.png?scale-down-to=1024 1024w,./framerusercontent.com/images/O9CdWxu2jWYocaIjJfI8RaWbCMg.png 1500w"
                                },
                                className: "framer-1k9wu9x",
                                "data-border": !0,
                                "data-framer-name": "Lqna 03",
                                name: "Lqna 03"
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 56px, 1440px) - 16px) / 3, 50px)",
                                        src: "./framerusercontent.com/images/ix44Ea3rd6iQNb8ICYShp1SbvXI.png",
                                        srcSet: "./framerusercontent.com/images/ix44Ea3rd6iQNb8ICYShp1SbvXI.png?scale-down-to=512 512w,./framerusercontent.com/images/ix44Ea3rd6iQNb8ICYShp1SbvXI.png?scale-down-to=1024 1024w,./framerusercontent.com/images/ix44Ea3rd6iQNb8ICYShp1SbvXI.png 1500w"
                                    }
                                },
                                tbgdi9qHR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 32px, 1440px) - 8px) / 2, 50px)",
                                        src: "./framerusercontent.com/images/ix44Ea3rd6iQNb8ICYShp1SbvXI.png",
                                        srcSet: "./framerusercontent.com/images/ix44Ea3rd6iQNb8ICYShp1SbvXI.png?scale-down-to=512 512w,./framerusercontent.com/images/ix44Ea3rd6iQNb8ICYShp1SbvXI.png?scale-down-to=1024 1024w,./framerusercontent.com/images/ix44Ea3rd6iQNb8ICYShp1SbvXI.png 1500w"
                                    }
                                }
                            },
                            children: e(S, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: P,
                                __framer__exit: N,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "max((min(100vw - 80px, 1440px) - 24px) / 4, 50px)",
                                    src: "./framerusercontent.com/images/ix44Ea3rd6iQNb8ICYShp1SbvXI.png",
                                    srcSet: "./framerusercontent.com/images/ix44Ea3rd6iQNb8ICYShp1SbvXI.png?scale-down-to=512 512w,./framerusercontent.com/images/ix44Ea3rd6iQNb8ICYShp1SbvXI.png?scale-down-to=1024 1024w,./framerusercontent.com/images/ix44Ea3rd6iQNb8ICYShp1SbvXI.png 1500w"
                                },
                                className: "framer-1r4xugz",
                                "data-border": !0,
                                "data-framer-name": "Lqna 06",
                                name: "Lqna 06"
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        src: "./framerusercontent.com/images/buynow.png",
                                    }
                                },
                                tbgdi9qHR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        src: "./framerusercontent.com/images/buynow.png",
                                    }
                                }
                            },
                            children: e(S, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: P,
                                __framer__exit: N,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    src: "./framerusercontent.com/images/buynow.png",
                                },
                                className: "framer-148qbkj",
                                "data-border": !0,
                                "data-framer-name": "Lqna 04",
                                name: "Lqna 04"
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 56px, 1440px) - 16px) / 3, 50px)",
                                        src: "./framerusercontent.com/images/5iRup6ccVMshW89S7QhsgGspZc.png",
                                        srcSet: "./framerusercontent.com/images/5iRup6ccVMshW89S7QhsgGspZc.png?scale-down-to=512 512w,./framerusercontent.com/images/5iRup6ccVMshW89S7QhsgGspZc.png?scale-down-to=1024 1024w,./framerusercontent.com/images/5iRup6ccVMshW89S7QhsgGspZc.png 1500w"
                                    }
                                },
                                tbgdi9qHR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 32px, 1440px) - 8px) / 2, 50px)",
                                        src: "./framerusercontent.com/images/5iRup6ccVMshW89S7QhsgGspZc.png",
                                        srcSet: "./framerusercontent.com/images/5iRup6ccVMshW89S7QhsgGspZc.png?scale-down-to=512 512w,./framerusercontent.com/images/5iRup6ccVMshW89S7QhsgGspZc.png?scale-down-to=1024 1024w,./framerusercontent.com/images/5iRup6ccVMshW89S7QhsgGspZc.png 1500w"
                                    }
                                }
                            },
                            children: e(S, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: P,
                                __framer__exit: N,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "max((min(100vw - 80px, 1440px) - 24px) / 4, 50px)",
                                    src: "./framerusercontent.com/images/5iRup6ccVMshW89S7QhsgGspZc.png",
                                    srcSet: "./framerusercontent.com/images/5iRup6ccVMshW89S7QhsgGspZc.png?scale-down-to=512 512w,./framerusercontent.com/images/5iRup6ccVMshW89S7QhsgGspZc.png?scale-down-to=1024 1024w,./framerusercontent.com/images/5iRup6ccVMshW89S7QhsgGspZc.png 1500w"
                                },
                                className: "framer-ia8fvi",
                                "data-border": !0,
                                "data-framer-name": "Lqna 05",
                                name: "Lqna 05"
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 56px, 1440px) - 16px) / 3, 50px)",
                                        src: "./framerusercontent.com/images/HxCEbqw9i8ZOkl9fZC1vY9ISlGU.png",
                                        srcSet: "./framerusercontent.com/images/HxCEbqw9i8ZOkl9fZC1vY9ISlGU.png?scale-down-to=512 512w,./framerusercontent.com/images/HxCEbqw9i8ZOkl9fZC1vY9ISlGU.png?scale-down-to=1024 1024w,./framerusercontent.com/images/HxCEbqw9i8ZOkl9fZC1vY9ISlGU.png 1500w"
                                    }
                                },
                                tbgdi9qHR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 32px, 1440px) - 8px) / 2, 50px)",
                                        src: "./framerusercontent.com/images/HxCEbqw9i8ZOkl9fZC1vY9ISlGU.png",
                                        srcSet: "./framerusercontent.com/images/HxCEbqw9i8ZOkl9fZC1vY9ISlGU.png?scale-down-to=512 512w,./framerusercontent.com/images/HxCEbqw9i8ZOkl9fZC1vY9ISlGU.png?scale-down-to=1024 1024w,./framerusercontent.com/images/HxCEbqw9i8ZOkl9fZC1vY9ISlGU.png 1500w"
                                    }
                                }
                            },
                            children: e(S, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: P,
                                __framer__exit: N,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "max((min(100vw - 80px, 1440px) - 24px) / 4, 50px)",
                                    src: "./framerusercontent.com/images/HxCEbqw9i8ZOkl9fZC1vY9ISlGU.png",
                                    srcSet: "./framerusercontent.com/images/HxCEbqw9i8ZOkl9fZC1vY9ISlGU.png?scale-down-to=512 512w,./framerusercontent.com/images/HxCEbqw9i8ZOkl9fZC1vY9ISlGU.png?scale-down-to=1024 1024w,./framerusercontent.com/images/HxCEbqw9i8ZOkl9fZC1vY9ISlGU.png 1500w"
                                },
                                className: "framer-21jw4g",
                                "data-border": !0,
                                "data-framer-name": "Lqna 07",
                                name: "Lqna 07"
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 56px, 1440px) - 16px) / 3, 50px)",
                                        src: "./framerusercontent.com/images/hquyB9BLYGVMI0H29H4I8qHaJ0k.png",
                                        srcSet: "./framerusercontent.com/images/hquyB9BLYGVMI0H29H4I8qHaJ0k.png?scale-down-to=512 512w,./framerusercontent.com/images/hquyB9BLYGVMI0H29H4I8qHaJ0k.png?scale-down-to=1024 1024w,./framerusercontent.com/images/hquyB9BLYGVMI0H29H4I8qHaJ0k.png 1500w"
                                    }
                                },
                                tbgdi9qHR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 32px, 1440px) - 8px) / 2, 50px)",
                                        src: "./framerusercontent.com/images/hquyB9BLYGVMI0H29H4I8qHaJ0k.png",
                                        srcSet: "./framerusercontent.com/images/hquyB9BLYGVMI0H29H4I8qHaJ0k.png?scale-down-to=512 512w,./framerusercontent.com/images/hquyB9BLYGVMI0H29H4I8qHaJ0k.png?scale-down-to=1024 1024w,./framerusercontent.com/images/hquyB9BLYGVMI0H29H4I8qHaJ0k.png 1500w"
                                    }
                                }
                            },
                            children: e(S, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: P,
                                __framer__exit: N,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "max((min(100vw - 80px, 1440px) - 24px) / 4, 50px)",
                                    src: "./framerusercontent.com/images/hquyB9BLYGVMI0H29H4I8qHaJ0k.png",
                                    srcSet: "./framerusercontent.com/images/hquyB9BLYGVMI0H29H4I8qHaJ0k.png?scale-down-to=512 512w,./framerusercontent.com/images/hquyB9BLYGVMI0H29H4I8qHaJ0k.png?scale-down-to=1024 1024w,./framerusercontent.com/images/hquyB9BLYGVMI0H29H4I8qHaJ0k.png 1500w"
                                },
                                className: "framer-1fvfcop",
                                "data-border": !0,
                                "data-framer-name": "Lqna 08",
                                name: "Lqna 08"
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 56px, 1440px) - 16px) / 3, 50px)",
                                        src: "./framerusercontent.com/images/1jv5LtDR1vR7cZIO041WH5PuBU.png",
                                        srcSet: "./framerusercontent.com/images/1jv5LtDR1vR7cZIO041WH5PuBU.png?scale-down-to=512 512w,./framerusercontent.com/images/1jv5LtDR1vR7cZIO041WH5PuBU.png?scale-down-to=1024 1024w,./framerusercontent.com/images/1jv5LtDR1vR7cZIO041WH5PuBU.png 1500w"
                                    }
                                },
                                tbgdi9qHR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 32px, 1440px) - 8px) / 2, 50px)",
                                        src: "./framerusercontent.com/images/1jv5LtDR1vR7cZIO041WH5PuBU.png",
                                        srcSet: "./framerusercontent.com/images/1jv5LtDR1vR7cZIO041WH5PuBU.png?scale-down-to=512 512w,./framerusercontent.com/images/1jv5LtDR1vR7cZIO041WH5PuBU.png?scale-down-to=1024 1024w,./framerusercontent.com/images/1jv5LtDR1vR7cZIO041WH5PuBU.png 1500w"
                                    }
                                }
                            },
                            children: e(S, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: P,
                                __framer__exit: N,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "max((min(100vw - 80px, 1440px) - 24px) / 4, 50px)",
                                    src: "./framerusercontent.com/images/1jv5LtDR1vR7cZIO041WH5PuBU.png",
                                    srcSet: "./framerusercontent.com/images/1jv5LtDR1vR7cZIO041WH5PuBU.png?scale-down-to=512 512w,./framerusercontent.com/images/1jv5LtDR1vR7cZIO041WH5PuBU.png?scale-down-to=1024 1024w,./framerusercontent.com/images/1jv5LtDR1vR7cZIO041WH5PuBU.png 1500w"
                                },
                                className: "framer-1oonenc",
                                "data-border": !0,
                                "data-framer-name": "Lqna 09",
                                name: "Lqna 09"
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 56px, 1440px) - 16px) / 3, 50px)",
                                        src: "./framerusercontent.com/images/mCsz6V3jGkvjqHUu4Edhw5EnsgA.png",
                                        srcSet: "./framerusercontent.com/images/mCsz6V3jGkvjqHUu4Edhw5EnsgA.png?scale-down-to=512 512w,./framerusercontent.com/images/mCsz6V3jGkvjqHUu4Edhw5EnsgA.png?scale-down-to=1024 1024w,./framerusercontent.com/images/mCsz6V3jGkvjqHUu4Edhw5EnsgA.png 1500w"
                                    }
                                },
                                tbgdi9qHR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 32px, 1440px) - 8px) / 2, 50px)",
                                        src: "./framerusercontent.com/images/mCsz6V3jGkvjqHUu4Edhw5EnsgA.png",
                                        srcSet: "./framerusercontent.com/images/mCsz6V3jGkvjqHUu4Edhw5EnsgA.png?scale-down-to=512 512w,./framerusercontent.com/images/mCsz6V3jGkvjqHUu4Edhw5EnsgA.png?scale-down-to=1024 1024w,./framerusercontent.com/images/mCsz6V3jGkvjqHUu4Edhw5EnsgA.png 1500w"
                                    }
                                }
                            },
                            children: e(S, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: P,
                                __framer__exit: N,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "max((min(100vw - 80px, 1440px) - 24px) / 4, 50px)",
                                    src: "./framerusercontent.com/images/mCsz6V3jGkvjqHUu4Edhw5EnsgA.png",
                                    srcSet: "./framerusercontent.com/images/mCsz6V3jGkvjqHUu4Edhw5EnsgA.png?scale-down-to=512 512w,./framerusercontent.com/images/mCsz6V3jGkvjqHUu4Edhw5EnsgA.png?scale-down-to=1024 1024w,./framerusercontent.com/images/mCsz6V3jGkvjqHUu4Edhw5EnsgA.png 1500w"
                                },
                                className: "framer-1sco4en",
                                "data-border": !0,
                                "data-framer-name": "Lqna 12",
                                name: "Lqna 12"
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 56px, 1440px) - 16px) / 3, 50px)",
                                        src: "./framerusercontent.com/images/ZL1eYKJ0PpfaovsCKfBwQjw3mrs.png",
                                        srcSet: "./framerusercontent.com/images/ZL1eYKJ0PpfaovsCKfBwQjw3mrs.png?scale-down-to=512 512w,./framerusercontent.com/images/ZL1eYKJ0PpfaovsCKfBwQjw3mrs.png?scale-down-to=1024 1024w,./framerusercontent.com/images/ZL1eYKJ0PpfaovsCKfBwQjw3mrs.png 1500w"
                                    }
                                },
                                tbgdi9qHR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 32px, 1440px) - 8px) / 2, 50px)",
                                        src: "./framerusercontent.com/images/ZL1eYKJ0PpfaovsCKfBwQjw3mrs.png",
                                        srcSet: "./framerusercontent.com/images/ZL1eYKJ0PpfaovsCKfBwQjw3mrs.png?scale-down-to=512 512w,./framerusercontent.com/images/ZL1eYKJ0PpfaovsCKfBwQjw3mrs.png?scale-down-to=1024 1024w,./framerusercontent.com/images/ZL1eYKJ0PpfaovsCKfBwQjw3mrs.png 1500w"
                                    }
                                }
                            },
                            children: e(S, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: P,
                                __framer__exit: N,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "max((min(100vw - 80px, 1440px) - 24px) / 4, 50px)",
                                    src: "./framerusercontent.com/images/ZL1eYKJ0PpfaovsCKfBwQjw3mrs.png",
                                    srcSet: "./framerusercontent.com/images/ZL1eYKJ0PpfaovsCKfBwQjw3mrs.png?scale-down-to=512 512w,./framerusercontent.com/images/ZL1eYKJ0PpfaovsCKfBwQjw3mrs.png?scale-down-to=1024 1024w,./framerusercontent.com/images/ZL1eYKJ0PpfaovsCKfBwQjw3mrs.png 1500w"
                                },
                                className: "framer-eq7hne",
                                "data-border": !0,
                                "data-framer-name": "Lqna 13",
                                name: "Lqna 13"
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 56px, 1440px) - 16px) / 3, 50px)",
                                        src: "./framerusercontent.com/images/W2Bebixk9hXTXAztRnmyOiXYVCM.png",
                                        srcSet: "./framerusercontent.com/images/W2Bebixk9hXTXAztRnmyOiXYVCM.png?scale-down-to=512 512w,./framerusercontent.com/images/W2Bebixk9hXTXAztRnmyOiXYVCM.png?scale-down-to=1024 1024w,./framerusercontent.com/images/W2Bebixk9hXTXAztRnmyOiXYVCM.png 1500w"
                                    }
                                },
                                tbgdi9qHR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 32px, 1440px) - 8px) / 2, 50px)",
                                        src: "./framerusercontent.com/images/W2Bebixk9hXTXAztRnmyOiXYVCM.png",
                                        srcSet: "./framerusercontent.com/images/W2Bebixk9hXTXAztRnmyOiXYVCM.png?scale-down-to=512 512w,./framerusercontent.com/images/W2Bebixk9hXTXAztRnmyOiXYVCM.png?scale-down-to=1024 1024w,./framerusercontent.com/images/W2Bebixk9hXTXAztRnmyOiXYVCM.png 1500w"
                                    }
                                }
                            },
                            children: e(S, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: P,
                                __framer__exit: N,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "max((min(100vw - 80px, 1440px) - 24px) / 4, 50px)",
                                    src: "./framerusercontent.com/images/W2Bebixk9hXTXAztRnmyOiXYVCM.png",
                                    srcSet: "./framerusercontent.com/images/W2Bebixk9hXTXAztRnmyOiXYVCM.png?scale-down-to=512 512w,./framerusercontent.com/images/W2Bebixk9hXTXAztRnmyOiXYVCM.png?scale-down-to=1024 1024w,./framerusercontent.com/images/W2Bebixk9hXTXAztRnmyOiXYVCM.png 1500w"
                                },
                                className: "framer-2umafq",
                                "data-border": !0,
                                "data-framer-name": "Lqna 14",
                                name: "Lqna 14"
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 56px, 1440px) - 16px) / 3, 50px)",
                                        src: "./framerusercontent.com/images/TPWUnFFMIDSqpkgVMfvbVPJIsc.png",
                                        srcSet: "./framerusercontent.com/images/TPWUnFFMIDSqpkgVMfvbVPJIsc.png?scale-down-to=512 512w,./framerusercontent.com/images/TPWUnFFMIDSqpkgVMfvbVPJIsc.png?scale-down-to=1024 1024w,./framerusercontent.com/images/TPWUnFFMIDSqpkgVMfvbVPJIsc.png 1500w"
                                    }
                                },
                                tbgdi9qHR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 32px, 1440px) - 8px) / 2, 50px)",
                                        src: "./framerusercontent.com/images/TPWUnFFMIDSqpkgVMfvbVPJIsc.png",
                                        srcSet: "./framerusercontent.com/images/TPWUnFFMIDSqpkgVMfvbVPJIsc.png?scale-down-to=512 512w,./framerusercontent.com/images/TPWUnFFMIDSqpkgVMfvbVPJIsc.png?scale-down-to=1024 1024w,./framerusercontent.com/images/TPWUnFFMIDSqpkgVMfvbVPJIsc.png 1500w"
                                    }
                                }
                            },
                            children: e(S, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: P,
                                __framer__exit: N,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "max((min(100vw - 80px, 1440px) - 24px) / 4, 50px)",
                                    src: "./framerusercontent.com/images/TPWUnFFMIDSqpkgVMfvbVPJIsc.png",
                                    srcSet: "./framerusercontent.com/images/TPWUnFFMIDSqpkgVMfvbVPJIsc.png?scale-down-to=512 512w,./framerusercontent.com/images/TPWUnFFMIDSqpkgVMfvbVPJIsc.png?scale-down-to=1024 1024w,./framerusercontent.com/images/TPWUnFFMIDSqpkgVMfvbVPJIsc.png 1500w"
                                },
                                className: "framer-zxxoao",
                                "data-border": !0,
                                "data-framer-name": "Lqna 15",
                                name: "Lqna 15"
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 56px, 1440px) - 16px) / 3, 50px)",
                                        src: "./framerusercontent.com/images/9J6NfUBoszlxn99SuYeQmjbW1U.png",
                                        srcSet: "./framerusercontent.com/images/9J6NfUBoszlxn99SuYeQmjbW1U.png?scale-down-to=512 512w,./framerusercontent.com/images/9J6NfUBoszlxn99SuYeQmjbW1U.png?scale-down-to=1024 1024w,./framerusercontent.com/images/9J6NfUBoszlxn99SuYeQmjbW1U.png 1500w"
                                    }
                                },
                                tbgdi9qHR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 32px, 1440px) - 8px) / 2, 50px)",
                                        src: "./framerusercontent.com/images/9J6NfUBoszlxn99SuYeQmjbW1U.png",
                                        srcSet: "./framerusercontent.com/images/9J6NfUBoszlxn99SuYeQmjbW1U.png?scale-down-to=512 512w,./framerusercontent.com/images/9J6NfUBoszlxn99SuYeQmjbW1U.png?scale-down-to=1024 1024w,./framerusercontent.com/images/9J6NfUBoszlxn99SuYeQmjbW1U.png 1500w"
                                    }
                                }
                            },
                            children: e(S, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: P,
                                __framer__exit: N,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "max((min(100vw - 80px, 1440px) - 24px) / 4, 50px)",
                                    src: "./framerusercontent.com/images/9J6NfUBoszlxn99SuYeQmjbW1U.png",
                                    srcSet: "./framerusercontent.com/images/9J6NfUBoszlxn99SuYeQmjbW1U.png?scale-down-to=512 512w,./framerusercontent.com/images/9J6NfUBoszlxn99SuYeQmjbW1U.png?scale-down-to=1024 1024w,./framerusercontent.com/images/9J6NfUBoszlxn99SuYeQmjbW1U.png 1500w"
                                },
                                className: "framer-1p7sydq",
                                "data-border": !0,
                                "data-framer-name": "Lqna 16",
                                name: "Lqna 16"
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 56px, 1440px) - 16px) / 3, 50px)",
                                        src: "./framerusercontent.com/images/vsNemgPhIzGpeyB2nwA1MGkxI.png",
                                        srcSet: "./framerusercontent.com/images/vsNemgPhIzGpeyB2nwA1MGkxI.png?scale-down-to=512 512w,./framerusercontent.com/images/vsNemgPhIzGpeyB2nwA1MGkxI.png?scale-down-to=1024 1024w,./framerusercontent.com/images/vsNemgPhIzGpeyB2nwA1MGkxI.png 1500w"
                                    }
                                },
                                tbgdi9qHR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 32px, 1440px) - 8px) / 2, 50px)",
                                        src: "./framerusercontent.com/images/vsNemgPhIzGpeyB2nwA1MGkxI.png",
                                        srcSet: "./framerusercontent.com/images/vsNemgPhIzGpeyB2nwA1MGkxI.png?scale-down-to=512 512w,./framerusercontent.com/images/vsNemgPhIzGpeyB2nwA1MGkxI.png?scale-down-to=1024 1024w,./framerusercontent.com/images/vsNemgPhIzGpeyB2nwA1MGkxI.png 1500w"
                                    }
                                }
                            },
                            children: e(S, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: P,
                                __framer__exit: N,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "max((min(100vw - 80px, 1440px) - 24px) / 4, 50px)",
                                    src: "./framerusercontent.com/images/vsNemgPhIzGpeyB2nwA1MGkxI.png",
                                    srcSet: "./framerusercontent.com/images/vsNemgPhIzGpeyB2nwA1MGkxI.png?scale-down-to=512 512w,./framerusercontent.com/images/vsNemgPhIzGpeyB2nwA1MGkxI.png?scale-down-to=1024 1024w,./framerusercontent.com/images/vsNemgPhIzGpeyB2nwA1MGkxI.png 1500w"
                                },
                                className: "framer-1p7uw6y",
                                "data-border": !0,
                                "data-framer-name": "Lqna 17",
                                name: "Lqna 17"
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 56px, 1440px) - 16px) / 3, 50px)",
                                        src: "./framerusercontent.com/images/lEik5xH2QcCU56Arp807rcDY8U.png",
                                        srcSet: "./framerusercontent.com/images/lEik5xH2QcCU56Arp807rcDY8U.png?scale-down-to=512 512w,./framerusercontent.com/images/lEik5xH2QcCU56Arp807rcDY8U.png?scale-down-to=1024 1024w,./framerusercontent.com/images/lEik5xH2QcCU56Arp807rcDY8U.png 1500w"
                                    }
                                },
                                tbgdi9qHR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 32px, 1440px) - 8px) / 2, 50px)",
                                        src: "./framerusercontent.com/images/lEik5xH2QcCU56Arp807rcDY8U.png",
                                        srcSet: "./framerusercontent.com/images/lEik5xH2QcCU56Arp807rcDY8U.png?scale-down-to=512 512w,./framerusercontent.com/images/lEik5xH2QcCU56Arp807rcDY8U.png?scale-down-to=1024 1024w,./framerusercontent.com/images/lEik5xH2QcCU56Arp807rcDY8U.png 1500w"
                                    }
                                }
                            },
                            children: e(S, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: P,
                                __framer__exit: N,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "max((min(100vw - 80px, 1440px) - 24px) / 4, 50px)",
                                    src: "./framerusercontent.com/images/lEik5xH2QcCU56Arp807rcDY8U.png",
                                    srcSet: "./framerusercontent.com/images/lEik5xH2QcCU56Arp807rcDY8U.png?scale-down-to=512 512w,./framerusercontent.com/images/lEik5xH2QcCU56Arp807rcDY8U.png?scale-down-to=1024 1024w,./framerusercontent.com/images/lEik5xH2QcCU56Arp807rcDY8U.png 1500w"
                                },
                                className: "framer-wwkjee",
                                "data-border": !0,
                                "data-framer-name": "Lqna 18",
                                name: "Lqna 18"
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 56px, 1440px) - 16px) / 3, 50px)",
                                        src: "./framerusercontent.com/images/BwRb0al2A2UXoIdPoHk2nVX140.png",
                                        srcSet: "./framerusercontent.com/images/BwRb0al2A2UXoIdPoHk2nVX140.png?scale-down-to=512 512w,./framerusercontent.com/images/BwRb0al2A2UXoIdPoHk2nVX140.png?scale-down-to=1024 1024w,./framerusercontent.com/images/BwRb0al2A2UXoIdPoHk2nVX140.png 1500w"
                                    }
                                },
                                tbgdi9qHR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 32px, 1440px) - 8px) / 2, 50px)",
                                        src: "./framerusercontent.com/images/BwRb0al2A2UXoIdPoHk2nVX140.png",
                                        srcSet: "./framerusercontent.com/images/BwRb0al2A2UXoIdPoHk2nVX140.png?scale-down-to=512 512w,./framerusercontent.com/images/BwRb0al2A2UXoIdPoHk2nVX140.png?scale-down-to=1024 1024w,./framerusercontent.com/images/BwRb0al2A2UXoIdPoHk2nVX140.png 1500w"
                                    }
                                }
                            },
                            children: e(S, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: P,
                                __framer__exit: N,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "max((min(100vw - 80px, 1440px) - 24px) / 4, 50px)",
                                    src: "./framerusercontent.com/images/BwRb0al2A2UXoIdPoHk2nVX140.png",
                                    srcSet: "./framerusercontent.com/images/BwRb0al2A2UXoIdPoHk2nVX140.png?scale-down-to=512 512w,./framerusercontent.com/images/BwRb0al2A2UXoIdPoHk2nVX140.png?scale-down-to=1024 1024w,./framerusercontent.com/images/BwRb0al2A2UXoIdPoHk2nVX140.png 1500w"
                                },
                                className: "framer-nsiow7",
                                "data-border": !0,
                                "data-framer-name": "Lqna 19",
                                name: "Lqna 19"
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 56px, 1440px) - 16px) / 3, 50px)",
                                        src: "./framerusercontent.com/images/2e0lZsmf21afpmdrBswKZbsVyFg.png",
                                        srcSet: "./framerusercontent.com/images/2e0lZsmf21afpmdrBswKZbsVyFg.png?scale-down-to=512 512w,./framerusercontent.com/images/2e0lZsmf21afpmdrBswKZbsVyFg.png?scale-down-to=1024 1024w,./framerusercontent.com/images/2e0lZsmf21afpmdrBswKZbsVyFg.png 1500w"
                                    }
                                },
                                tbgdi9qHR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 32px, 1440px) - 8px) / 2, 50px)",
                                        src: "./framerusercontent.com/images/2e0lZsmf21afpmdrBswKZbsVyFg.png",
                                        srcSet: "./framerusercontent.com/images/2e0lZsmf21afpmdrBswKZbsVyFg.png?scale-down-to=512 512w,./framerusercontent.com/images/2e0lZsmf21afpmdrBswKZbsVyFg.png?scale-down-to=1024 1024w,./framerusercontent.com/images/2e0lZsmf21afpmdrBswKZbsVyFg.png 1500w"
                                    }
                                }
                            },
                            children: e(S, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: P,
                                __framer__exit: N,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "max((min(100vw - 80px, 1440px) - 24px) / 4, 50px)",
                                    src: "./framerusercontent.com/images/2e0lZsmf21afpmdrBswKZbsVyFg.png",
                                    srcSet: "./framerusercontent.com/images/2e0lZsmf21afpmdrBswKZbsVyFg.png?scale-down-to=512 512w,./framerusercontent.com/images/2e0lZsmf21afpmdrBswKZbsVyFg.png?scale-down-to=1024 1024w,./framerusercontent.com/images/2e0lZsmf21afpmdrBswKZbsVyFg.png 1500w"
                                },
                                className: "framer-13jwaoh",
                                "data-border": !0,
                                "data-framer-name": "Lqna 20",
                                name: "Lqna 20"
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 56px, 1440px) - 16px) / 3, 50px)",
                                        src: "./framerusercontent.com/images/rJEFYeJjYKF9NzMAkOmxpTgKCE.png",
                                        srcSet: "./framerusercontent.com/images/rJEFYeJjYKF9NzMAkOmxpTgKCE.png?scale-down-to=512 512w,./framerusercontent.com/images/rJEFYeJjYKF9NzMAkOmxpTgKCE.png?scale-down-to=1024 1024w,./framerusercontent.com/images/rJEFYeJjYKF9NzMAkOmxpTgKCE.png 1500w"
                                    }
                                },
                                tbgdi9qHR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 32px, 1440px) - 8px) / 2, 50px)",
                                        src: "./framerusercontent.com/images/rJEFYeJjYKF9NzMAkOmxpTgKCE.png",
                                        srcSet: "./framerusercontent.com/images/rJEFYeJjYKF9NzMAkOmxpTgKCE.png?scale-down-to=512 512w,./framerusercontent.com/images/rJEFYeJjYKF9NzMAkOmxpTgKCE.png?scale-down-to=1024 1024w,./framerusercontent.com/images/rJEFYeJjYKF9NzMAkOmxpTgKCE.png 1500w"
                                    }
                                }
                            },
                            children: e(S, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: P,
                                __framer__exit: N,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "max((min(100vw - 80px, 1440px) - 24px) / 4, 50px)",
                                    src: "./framerusercontent.com/images/rJEFYeJjYKF9NzMAkOmxpTgKCE.png",
                                    srcSet: "./framerusercontent.com/images/rJEFYeJjYKF9NzMAkOmxpTgKCE.png?scale-down-to=512 512w,./framerusercontent.com/images/rJEFYeJjYKF9NzMAkOmxpTgKCE.png?scale-down-to=1024 1024w,./framerusercontent.com/images/rJEFYeJjYKF9NzMAkOmxpTgKCE.png 1500w"
                                },
                                className: "framer-130s7t9",
                                "data-border": !0,
                                "data-framer-name": "Lqna 21",
                                name: "Lqna 21"
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 56px, 1440px) - 16px) / 3, 50px)",
                                        src: "./framerusercontent.com/images/dOQD9RnhB7PUzf2RyvHRejRfSk.png",
                                        srcSet: "./framerusercontent.com/images/dOQD9RnhB7PUzf2RyvHRejRfSk.png?scale-down-to=512 512w,./framerusercontent.com/images/dOQD9RnhB7PUzf2RyvHRejRfSk.png?scale-down-to=1024 1024w,./framerusercontent.com/images/dOQD9RnhB7PUzf2RyvHRejRfSk.png 1500w"
                                    }
                                },
                                tbgdi9qHR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 32px, 1440px) - 8px) / 2, 50px)",
                                        src: "./framerusercontent.com/images/dOQD9RnhB7PUzf2RyvHRejRfSk.png",
                                        srcSet: "./framerusercontent.com/images/dOQD9RnhB7PUzf2RyvHRejRfSk.png?scale-down-to=512 512w,./framerusercontent.com/images/dOQD9RnhB7PUzf2RyvHRejRfSk.png?scale-down-to=1024 1024w,./framerusercontent.com/images/dOQD9RnhB7PUzf2RyvHRejRfSk.png 1500w"
                                    }
                                }
                            },
                            children: e(S, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: P,
                                __framer__exit: N,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "max((min(100vw - 80px, 1440px) - 24px) / 4, 50px)",
                                    src: "./framerusercontent.com/images/dOQD9RnhB7PUzf2RyvHRejRfSk.png",
                                    srcSet: "./framerusercontent.com/images/dOQD9RnhB7PUzf2RyvHRejRfSk.png?scale-down-to=512 512w,./framerusercontent.com/images/dOQD9RnhB7PUzf2RyvHRejRfSk.png?scale-down-to=1024 1024w,./framerusercontent.com/images/dOQD9RnhB7PUzf2RyvHRejRfSk.png 1500w"
                                },
                                className: "framer-ea17q7",
                                "data-border": !0,
                                "data-framer-name": "Lqna 22",
                                name: "Lqna 22"
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 56px, 1440px) - 16px) / 3, 50px)",
                                        src: "./framerusercontent.com/images/z0UhYjAvhniYzzN1uPgs2dhS0rI.png",
                                        srcSet: "./framerusercontent.com/images/z0UhYjAvhniYzzN1uPgs2dhS0rI.png?scale-down-to=512 512w,./framerusercontent.com/images/z0UhYjAvhniYzzN1uPgs2dhS0rI.png?scale-down-to=1024 1024w,./framerusercontent.com/images/z0UhYjAvhniYzzN1uPgs2dhS0rI.png 1500w"
                                    }
                                },
                                tbgdi9qHR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 32px, 1440px) - 8px) / 2, 50px)",
                                        src: "./framerusercontent.com/images/z0UhYjAvhniYzzN1uPgs2dhS0rI.png",
                                        srcSet: "./framerusercontent.com/images/z0UhYjAvhniYzzN1uPgs2dhS0rI.png?scale-down-to=512 512w,./framerusercontent.com/images/z0UhYjAvhniYzzN1uPgs2dhS0rI.png?scale-down-to=1024 1024w,./framerusercontent.com/images/z0UhYjAvhniYzzN1uPgs2dhS0rI.png 1500w"
                                    }
                                }
                            },
                            children: e(S, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: P,
                                __framer__exit: N,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "max((min(100vw - 80px, 1440px) - 24px) / 4, 50px)",
                                    src: "./framerusercontent.com/images/z0UhYjAvhniYzzN1uPgs2dhS0rI.png",
                                    srcSet: "./framerusercontent.com/images/z0UhYjAvhniYzzN1uPgs2dhS0rI.png?scale-down-to=512 512w,./framerusercontent.com/images/z0UhYjAvhniYzzN1uPgs2dhS0rI.png?scale-down-to=1024 1024w,./framerusercontent.com/images/z0UhYjAvhniYzzN1uPgs2dhS0rI.png 1500w"
                                },
                                className: "framer-54luwu",
                                "data-border": !0,
                                "data-framer-name": "Lqna 22",
                                name: "Lqna 22"
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 56px, 1440px) - 16px) / 3, 50px)",
                                        src: "./framerusercontent.com/images/V9Gk5p4SZKQvflIswKHFetlyF8.png",
                                        srcSet: "./framerusercontent.com/images/V9Gk5p4SZKQvflIswKHFetlyF8.png?scale-down-to=512 512w,./framerusercontent.com/images/V9Gk5p4SZKQvflIswKHFetlyF8.png?scale-down-to=1024 1024w,./framerusercontent.com/images/V9Gk5p4SZKQvflIswKHFetlyF8.png 1500w"
                                    }
                                },
                                tbgdi9qHR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 32px, 1440px) - 8px) / 2, 50px)",
                                        src: "./framerusercontent.com/images/V9Gk5p4SZKQvflIswKHFetlyF8.png",
                                        srcSet: "./framerusercontent.com/images/V9Gk5p4SZKQvflIswKHFetlyF8.png?scale-down-to=512 512w,./framerusercontent.com/images/V9Gk5p4SZKQvflIswKHFetlyF8.png?scale-down-to=1024 1024w,./framerusercontent.com/images/V9Gk5p4SZKQvflIswKHFetlyF8.png 1500w"
                                    }
                                }
                            },
                            children: e(S, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: P,
                                __framer__exit: N,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "max((min(100vw - 80px, 1440px) - 24px) / 4, 50px)",
                                    src: "./framerusercontent.com/images/V9Gk5p4SZKQvflIswKHFetlyF8.png",
                                    srcSet: "./framerusercontent.com/images/V9Gk5p4SZKQvflIswKHFetlyF8.png?scale-down-to=512 512w,./framerusercontent.com/images/V9Gk5p4SZKQvflIswKHFetlyF8.png?scale-down-to=1024 1024w,./framerusercontent.com/images/V9Gk5p4SZKQvflIswKHFetlyF8.png 1500w"
                                },
                                className: "framer-191akss",
                                "data-border": !0,
                                "data-framer-name": "Lqna 24",
                                name: "Lqna 24"
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 56px, 1440px) - 16px) / 3, 50px)",
                                        src: "./framerusercontent.com/images/rDhQGARqaSwpPj9kT50oNS4zb0A.png",
                                        srcSet: "./framerusercontent.com/images/rDhQGARqaSwpPj9kT50oNS4zb0A.png?scale-down-to=512 512w,./framerusercontent.com/images/rDhQGARqaSwpPj9kT50oNS4zb0A.png?scale-down-to=1024 1024w,./framerusercontent.com/images/rDhQGARqaSwpPj9kT50oNS4zb0A.png 1500w"
                                    }
                                },
                                tbgdi9qHR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 32px, 1440px) - 8px) / 2, 50px)",
                                        src: "./framerusercontent.com/images/rDhQGARqaSwpPj9kT50oNS4zb0A.png",
                                        srcSet: "./framerusercontent.com/images/rDhQGARqaSwpPj9kT50oNS4zb0A.png?scale-down-to=512 512w,./framerusercontent.com/images/rDhQGARqaSwpPj9kT50oNS4zb0A.png?scale-down-to=1024 1024w,./framerusercontent.com/images/rDhQGARqaSwpPj9kT50oNS4zb0A.png 1500w"
                                    }
                                }
                            },
                            children: e(S, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: P,
                                __framer__exit: N,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "max((min(100vw - 80px, 1440px) - 24px) / 4, 50px)",
                                    src: "./framerusercontent.com/images/rDhQGARqaSwpPj9kT50oNS4zb0A.png",
                                    srcSet: "./framerusercontent.com/images/rDhQGARqaSwpPj9kT50oNS4zb0A.png?scale-down-to=512 512w,./framerusercontent.com/images/rDhQGARqaSwpPj9kT50oNS4zb0A.png?scale-down-to=1024 1024w,./framerusercontent.com/images/rDhQGARqaSwpPj9kT50oNS4zb0A.png 1500w"
                                },
                                className: "framer-12kv4eh",
                                "data-border": !0,
                                "data-framer-name": "Lqna 26",
                                name: "Lqna 26"
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 56px, 1440px) - 16px) / 3, 50px)",
                                        src: "./framerusercontent.com/images/9vdIB46WY2zYBun8Ql88LB9Z2g.png",
                                        srcSet: "./framerusercontent.com/images/9vdIB46WY2zYBun8Ql88LB9Z2g.png?scale-down-to=512 512w,./framerusercontent.com/images/9vdIB46WY2zYBun8Ql88LB9Z2g.png?scale-down-to=1024 1024w,./framerusercontent.com/images/9vdIB46WY2zYBun8Ql88LB9Z2g.png 1500w"
                                    }
                                },
                                tbgdi9qHR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 32px, 1440px) - 8px) / 2, 50px)",
                                        src: "./framerusercontent.com/images/9vdIB46WY2zYBun8Ql88LB9Z2g.png",
                                        srcSet: "./framerusercontent.com/images/9vdIB46WY2zYBun8Ql88LB9Z2g.png?scale-down-to=512 512w,./framerusercontent.com/images/9vdIB46WY2zYBun8Ql88LB9Z2g.png?scale-down-to=1024 1024w,./framerusercontent.com/images/9vdIB46WY2zYBun8Ql88LB9Z2g.png 1500w"
                                    }
                                }
                            },
                            children: e(S, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: P,
                                __framer__exit: N,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "max((min(100vw - 80px, 1440px) - 24px) / 4, 50px)",
                                    src: "./framerusercontent.com/images/9vdIB46WY2zYBun8Ql88LB9Z2g.png",
                                    srcSet: "./framerusercontent.com/images/9vdIB46WY2zYBun8Ql88LB9Z2g.png?scale-down-to=512 512w,./framerusercontent.com/images/9vdIB46WY2zYBun8Ql88LB9Z2g.png?scale-down-to=1024 1024w,./framerusercontent.com/images/9vdIB46WY2zYBun8Ql88LB9Z2g.png 1500w"
                                },
                                className: "framer-129f8nk",
                                "data-border": !0,
                                "data-framer-name": "Lqna 27",
                                name: "Lqna 27"
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 56px, 1440px) - 16px) / 3, 50px)",
                                        src: "./framerusercontent.com/images/biBpzcyZaIXL3dRNJFIUpdpVc.png",
                                        srcSet: "./framerusercontent.com/images/biBpzcyZaIXL3dRNJFIUpdpVc.png?scale-down-to=512 512w,./framerusercontent.com/images/biBpzcyZaIXL3dRNJFIUpdpVc.png?scale-down-to=1024 1024w,./framerusercontent.com/images/biBpzcyZaIXL3dRNJFIUpdpVc.png 1500w"
                                    }
                                },
                                tbgdi9qHR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 32px, 1440px) - 8px) / 2, 50px)",
                                        src: "./framerusercontent.com/images/biBpzcyZaIXL3dRNJFIUpdpVc.png",
                                        srcSet: "./framerusercontent.com/images/biBpzcyZaIXL3dRNJFIUpdpVc.png?scale-down-to=512 512w,./framerusercontent.com/images/biBpzcyZaIXL3dRNJFIUpdpVc.png?scale-down-to=1024 1024w,./framerusercontent.com/images/biBpzcyZaIXL3dRNJFIUpdpVc.png 1500w"
                                    }
                                }
                            },
                            children: e(S, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: P,
                                __framer__exit: N,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "max((min(100vw - 80px, 1440px) - 24px) / 4, 50px)",
                                    src: "./framerusercontent.com/images/biBpzcyZaIXL3dRNJFIUpdpVc.png",
                                    srcSet: "./framerusercontent.com/images/biBpzcyZaIXL3dRNJFIUpdpVc.png?scale-down-to=512 512w,./framerusercontent.com/images/biBpzcyZaIXL3dRNJFIUpdpVc.png?scale-down-to=1024 1024w,./framerusercontent.com/images/biBpzcyZaIXL3dRNJFIUpdpVc.png 1500w"
                                },
                                className: "framer-1s7c6l7",
                                "data-border": !0,
                                "data-framer-name": "Lqna 28",
                                name: "Lqna 28"
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 56px, 1440px) - 16px) / 3, 50px)",
                                        src: "./framerusercontent.com/images/IHGAoCnY5psTXJEutWt4quvXXo.png",
                                        srcSet: "./framerusercontent.com/images/IHGAoCnY5psTXJEutWt4quvXXo.png?scale-down-to=512 512w,./framerusercontent.com/images/IHGAoCnY5psTXJEutWt4quvXXo.png?scale-down-to=1024 1024w,./framerusercontent.com/images/IHGAoCnY5psTXJEutWt4quvXXo.png 1500w"
                                    }
                                },
                                tbgdi9qHR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 32px, 1440px) - 8px) / 2, 50px)",
                                        src: "./framerusercontent.com/images/IHGAoCnY5psTXJEutWt4quvXXo.png",
                                        srcSet: "./framerusercontent.com/images/IHGAoCnY5psTXJEutWt4quvXXo.png?scale-down-to=512 512w,./framerusercontent.com/images/IHGAoCnY5psTXJEutWt4quvXXo.png?scale-down-to=1024 1024w,./framerusercontent.com/images/IHGAoCnY5psTXJEutWt4quvXXo.png 1500w"
                                    }
                                }
                            },
                            children: e(S, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: P,
                                __framer__exit: N,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "max((min(100vw - 80px, 1440px) - 24px) / 4, 50px)",
                                    src: "./framerusercontent.com/images/IHGAoCnY5psTXJEutWt4quvXXo.png",
                                    srcSet: "./framerusercontent.com/images/IHGAoCnY5psTXJEutWt4quvXXo.png?scale-down-to=512 512w,./framerusercontent.com/images/IHGAoCnY5psTXJEutWt4quvXXo.png?scale-down-to=1024 1024w,./framerusercontent.com/images/IHGAoCnY5psTXJEutWt4quvXXo.png 1500w"
                                },
                                className: "framer-r4m2zp",
                                "data-border": !0,
                                "data-framer-name": "Lqna 29",
                                name: "Lqna 29"
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 56px, 1440px) - 16px) / 3, 50px)",
                                        src: "./framerusercontent.com/images/8T1HLmshtYLer6sChidXiThyZFs.png",
                                        srcSet: "./framerusercontent.com/images/8T1HLmshtYLer6sChidXiThyZFs.png?scale-down-to=512 512w,./framerusercontent.com/images/8T1HLmshtYLer6sChidXiThyZFs.png?scale-down-to=1024 1024w,./framerusercontent.com/images/8T1HLmshtYLer6sChidXiThyZFs.png 1500w"
                                    }
                                },
                                tbgdi9qHR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 32px, 1440px) - 8px) / 2, 50px)",
                                        src: "./framerusercontent.com/images/8T1HLmshtYLer6sChidXiThyZFs.png",
                                        srcSet: "./framerusercontent.com/images/8T1HLmshtYLer6sChidXiThyZFs.png?scale-down-to=512 512w,./framerusercontent.com/images/8T1HLmshtYLer6sChidXiThyZFs.png?scale-down-to=1024 1024w,./framerusercontent.com/images/8T1HLmshtYLer6sChidXiThyZFs.png 1500w"
                                    }
                                }
                            },
                            children: e(S, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: P,
                                __framer__exit: N,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "max((min(100vw - 80px, 1440px) - 24px) / 4, 50px)",
                                    src: "./framerusercontent.com/images/8T1HLmshtYLer6sChidXiThyZFs.png",
                                    srcSet: "./framerusercontent.com/images/8T1HLmshtYLer6sChidXiThyZFs.png?scale-down-to=512 512w,./framerusercontent.com/images/8T1HLmshtYLer6sChidXiThyZFs.png?scale-down-to=1024 1024w,./framerusercontent.com/images/8T1HLmshtYLer6sChidXiThyZFs.png 1500w"
                                },
                                className: "framer-1lf6dw4",
                                "data-border": !0,
                                "data-framer-name": "Lqna 30",
                                name: "Lqna 30"
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 56px, 1440px) - 16px) / 3, 50px)",
                                        src: "./framerusercontent.com/images/chq92uBHLuzz8PqitB8PKKyIaI.png",
                                        srcSet: "./framerusercontent.com/images/chq92uBHLuzz8PqitB8PKKyIaI.png?scale-down-to=512 512w,./framerusercontent.com/images/chq92uBHLuzz8PqitB8PKKyIaI.png?scale-down-to=1024 1024w,./framerusercontent.com/images/chq92uBHLuzz8PqitB8PKKyIaI.png 1500w"
                                    }
                                },
                                tbgdi9qHR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 32px, 1440px) - 8px) / 2, 50px)",
                                        src: "./framerusercontent.com/images/chq92uBHLuzz8PqitB8PKKyIaI.png",
                                        srcSet: "./framerusercontent.com/images/chq92uBHLuzz8PqitB8PKKyIaI.png?scale-down-to=512 512w,./framerusercontent.com/images/chq92uBHLuzz8PqitB8PKKyIaI.png?scale-down-to=1024 1024w,./framerusercontent.com/images/chq92uBHLuzz8PqitB8PKKyIaI.png 1500w"
                                    }
                                }
                            },
                            children: e(S, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: P,
                                __framer__exit: N,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "max((min(100vw - 80px, 1440px) - 24px) / 4, 50px)",
                                    src: "./framerusercontent.com/images/chq92uBHLuzz8PqitB8PKKyIaI.png",
                                    srcSet: "./framerusercontent.com/images/chq92uBHLuzz8PqitB8PKKyIaI.png?scale-down-to=512 512w,./framerusercontent.com/images/chq92uBHLuzz8PqitB8PKKyIaI.png?scale-down-to=1024 1024w,./framerusercontent.com/images/chq92uBHLuzz8PqitB8PKKyIaI.png 1500w"
                                },
                                className: "framer-1hmrkdn",
                                "data-border": !0,
                                "data-framer-name": "Lqna 31",
                                name: "Lqna 31"
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 56px, 1440px) - 16px) / 3, 50px)",
                                        src: "./framerusercontent.com/images/O0KQW8UJUPqyow5Bc5jAW8dO21g.png",
                                        srcSet: "./framerusercontent.com/images/O0KQW8UJUPqyow5Bc5jAW8dO21g.png?scale-down-to=512 512w,./framerusercontent.com/images/O0KQW8UJUPqyow5Bc5jAW8dO21g.png?scale-down-to=1024 1024w,./framerusercontent.com/images/O0KQW8UJUPqyow5Bc5jAW8dO21g.png 1500w"
                                    }
                                },
                                tbgdi9qHR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 32px, 1440px) - 8px) / 2, 50px)",
                                        src: "./framerusercontent.com/images/O0KQW8UJUPqyow5Bc5jAW8dO21g.png",
                                        srcSet: "./framerusercontent.com/images/O0KQW8UJUPqyow5Bc5jAW8dO21g.png?scale-down-to=512 512w,./framerusercontent.com/images/O0KQW8UJUPqyow5Bc5jAW8dO21g.png?scale-down-to=1024 1024w,./framerusercontent.com/images/O0KQW8UJUPqyow5Bc5jAW8dO21g.png 1500w"
                                    }
                                }
                            },
                            children: e(S, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: P,
                                __framer__exit: N,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "max((min(100vw - 80px, 1440px) - 24px) / 4, 50px)",
                                    src: "./framerusercontent.com/images/O0KQW8UJUPqyow5Bc5jAW8dO21g.png",
                                    srcSet: "./framerusercontent.com/images/O0KQW8UJUPqyow5Bc5jAW8dO21g.png?scale-down-to=512 512w,./framerusercontent.com/images/O0KQW8UJUPqyow5Bc5jAW8dO21g.png?scale-down-to=1024 1024w,./framerusercontent.com/images/O0KQW8UJUPqyow5Bc5jAW8dO21g.png 1500w"
                                },
                                className: "framer-1mb2bh6",
                                "data-border": !0,
                                "data-framer-name": "Lqna 32",
                                name: "Lqna 32"
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 56px, 1440px) - 16px) / 3, 50px)",
                                        src: "./framerusercontent.com/images/7L80tZN14MTXw2y1CLQNP4pvQU.png",
                                        srcSet: "./framerusercontent.com/images/7L80tZN14MTXw2y1CLQNP4pvQU.png?scale-down-to=512 512w,./framerusercontent.com/images/7L80tZN14MTXw2y1CLQNP4pvQU.png?scale-down-to=1024 1024w,./framerusercontent.com/images/7L80tZN14MTXw2y1CLQNP4pvQU.png 1500w"
                                    }
                                },
                                tbgdi9qHR: {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "max((min(100vw - 32px, 1440px) - 8px) / 2, 50px)",
                                        src: "./framerusercontent.com/images/7L80tZN14MTXw2y1CLQNP4pvQU.png",
                                        srcSet: "./framerusercontent.com/images/7L80tZN14MTXw2y1CLQNP4pvQU.png?scale-down-to=512 512w,./framerusercontent.com/images/7L80tZN14MTXw2y1CLQNP4pvQU.png?scale-down-to=1024 1024w,./framerusercontent.com/images/7L80tZN14MTXw2y1CLQNP4pvQU.png 1500w"
                                    }
                                }
                            },
                            children: e(S, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: P,
                                __framer__exit: N,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                background: {
                                    alt: "",
                                    fit: "fill",
                                    intrinsicHeight: 1500,
                                    intrinsicWidth: 1500,
                                    pixelHeight: 1500,
                                    pixelWidth: 1500,
                                    sizes: "max((min(100vw - 80px, 1440px) - 24px) / 4, 50px)",
                                    src: "./framerusercontent.com/images/7L80tZN14MTXw2y1CLQNP4pvQU.png",
                                    srcSet: "./framerusercontent.com/images/7L80tZN14MTXw2y1CLQNP4pvQU.png?scale-down-to=512 512w,./framerusercontent.com/images/7L80tZN14MTXw2y1CLQNP4pvQU.png?scale-down-to=1024 1024w,./framerusercontent.com/images/7L80tZN14MTXw2y1CLQNP4pvQU.png 1500w"
                                },
                                className: "framer-1rk3efc",
                                "data-border": !0,
                                "data-framer-name": "Lqna 33",
                                name: "Lqna 33"
                            })
                        }), e(S, {
                            __framer__animate: {
                                transition: d
                            },
                            __framer__animateOnce: !1,
                            __framer__enter: P,
                            __framer__exit: N,
                            __framer__styleAppearEffectEnabled: !0,
                            __framer__threshold: .5,
                            __perspectiveFX: !1,
                            __targetOpacity: 1,
                            background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1500,
                                intrinsicWidth: 1500,
                                pixelHeight: 512,
                                pixelWidth: 512,
                                src: "./framerusercontent.com/images/iG7PkdVZxbFjIfUKJg924t4Yg.png"
                            },
                            className: "framer-ndwn36",
                            "data-border": !0,
                            "data-framer-name": "Lqna 34",
                            name: "Lqna 34"
                        })]
                    })]
                }), e(ne, {
                    children: e(Ye, {
                        className: "framer-tx3gtk-container",
                        children: e(Fe, {
                            alignment: "center",
                            direction: "left",
                            fadeOptions: {
                                fadeAlpha: 0,
                                fadeContent: !0,
                                fadeInset: 0,
                                fadeWidth: 25,
                                overflow: !1
                            },
                            gap: 10,
                            height: "100%",
                            hoverFactor: 1,
                            id: "BwPfkFOGM",
                            layoutId: "BwPfkFOGM",
                            padding: 10,
                            paddingBottom: 10,
                            paddingLeft: 10,
                            paddingPerSide: !1,
                            paddingRight: 10,
                            paddingTop: 10,
                            sizingOptions: {
                                heightType: !0,
                                widthType: !0
                            },
                            slots: [b(O.div, {
                                className: "framer-19o8mp9",
                                children: [e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-yibb0b",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                }), e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-1c4362k",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                }), e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-1p3zl87",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                }), e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-t1j2gt",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                }), e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-o1etyc",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                }), e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-vmtilf",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                }), e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-1f5czy2",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                }), e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-1ucxv5u",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                })]
                            })],
                            speed: 64,
                            style: {
                                height: "100%",
                                width: "100%"
                            },
                            width: "100%"
                        })
                    })
                }), b(Hr, {
                    animate: Er,
                    className: "framer-8abub1",
                    "data-framer-appear-id": "8abub1",
                    initial: zr,
                    optimized: !0,
                    children: [b("div", {
                        className: "framer-10wbps3",
                        children: [e($, {
                            background: {
                                alt: "",
                                fit: "fill",
                                intrinsicHeight: 1136,
                                intrinsicWidth: 720,
                                pixelHeight: 1136,
                                pixelWidth: 720,
                                sizes: "0.32px",
                                src: "./framerusercontent.com/images/RiTJo0JN3WVghPFvRIUFQ4N3eA.gif",
                                srcSet: "./framerusercontent.com/images/RiTJo0JN3WVghPFvRIUFQ4N3eA.gif?scale-down-to=1024 649w,./framerusercontent.com/images/RiTJo0JN3WVghPFvRIUFQ4N3eA.gif 720w"
                            },
                            className: "framer-1nbzzoy",
                            "data-framer-name": "Liquina_Posing",
                            name: "Liquina_Posing"
                        }), e("div", {
                            className: "framer-7fe0hd"
                        })]
                    }), e(f, {
                        breakpoint: n,
                        overrides: {
                            BE_1LvUPA: {
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "20px",
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "160%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "rgb(255, 255, 255)"
                                        },
                                        children: "Messages from the Community"
                                    })
                                })
                            },
                            tbgdi9qHR: {
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "160%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "rgb(255, 255, 255)"
                                        },
                                        children: "Messages from the Community"
                                    })
                                })
                            }
                        },
                        children: e(l, {
                            __fromCanvasComponent: !0,
                            children: e(a, {
                                children: e("p", {
                                    style: {
                                        "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                        "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                        "--framer-font-size": "24px",
                                        "--framer-font-weight": "500",
                                        "--framer-line-height": "160%",
                                        "--framer-text-alignment": "center",
                                        "--framer-text-color": "rgb(255, 255, 255)"
                                    },
                                    children: "Messages from the Community"
                                })
                            }),
                            className: "framer-1g4qkoc",
                            fonts: ["GF;Orbitron-500"],
                            verticalAlignment: "top",
                            withExternalLayout: !0
                        })
                    }), b("div", {
                        className: "framer-1kamh1v",
                        children: [e(f, {
                            breakpoint: n,
                            overrides: {
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/lqna_bullish_robotic_panties"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "120%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "/lqna_bullish_robotic_panties"
                                    })
                                }),
                                className: "framer-1cb4ldw",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/LQNA_WIFE_OF_YEETI"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "120%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "/LQNA_WIFE_OF_YEETI"
                                    })
                                }),
                                className: "framer-mrnpr4",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/Murad_Buy_And_PumP_LQNA"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "120%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "/Murad_Buy_And_PumP_LQNA"
                                    })
                                }),
                                className: "framer-3tdwh0",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/liquina_boolb_all_in"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "120%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "/liquina_boolb_all_in"
                                    })
                                }),
                                className: "framer-12ieuwg",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/send_it_my_waifu"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "120%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "/send_it_my_waifu"
                                    })
                                }),
                                className: "framer-7hlzwf",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "14px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/LQNA_TO_3DOLLAR_TODAY"
                                        })
                                    })
                                },
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/LQNA_TO_3DOLLAR_TODAY"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "120%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "/LQNA_TO_3DOLLAR_TODAY"
                                    })
                                }),
                                className: "framer-yid2d0",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "14px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/LQNA_TO_3DOLLAR"
                                        })
                                    })
                                },
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/LQNA_TO_3DOLLAR"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "120%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "/LQNA_TO_3DOLLAR"
                                    })
                                }),
                                className: "framer-1hvttoc",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "14px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/its_ATH_next_10m"
                                        })
                                    })
                                },
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/its_ATH_next_10m"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "120%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "/its_ATH_next_10m"
                                    })
                                }),
                                className: "framer-jfeb9k",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "14px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/lqna_1b_lfg"
                                        })
                                    })
                                },
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/lqna_1b_lfg"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "120%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "/lqna_1b_lfg"
                                    })
                                }),
                                className: "framer-19i2krl",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "14px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/WHEN_LQNA_ATH"
                                        })
                                    })
                                },
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/WHEN_LQNA_ATH"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "120%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "/WHEN_LQNA_ATH"
                                    })
                                }),
                                className: "framer-h4f66q",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "14px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/QUEENMAKER_IS_COOKING"
                                        })
                                    })
                                },
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/QUEENMAKER_IS_COOKING"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "120%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "/QUEENMAKER_IS_COOKING"
                                    })
                                }),
                                className: "framer-cb4cc3",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "14px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/toe_show_wen"
                                        })
                                    })
                                },
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/toe_show_wen"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "120%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "/toe_show_wen"
                                    })
                                }),
                                className: "framer-zeb6h4",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "14px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/feet_roadmap"
                                        })
                                    })
                                },
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/feet_roadmap"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "120%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "/feet_roadmap"
                                    })
                                }),
                                className: "framer-1k2s0dk",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "14px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/liquina_say_bozo"
                                        })
                                    })
                                },
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/liquina_say_bozo"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "120%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "/liquina_say_bozo"
                                    })
                                }),
                                className: "framer-14aw84q",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "14px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/why_cropped"
                                        })
                                    })
                                },
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/why_cropped"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "120%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "/why_cropped"
                                    })
                                }),
                                className: "framer-7u6xt2",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "14px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/need_toe"
                                        })
                                    })
                                },
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/need_toe"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "120%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "/need_toe"
                                    })
                                }),
                                className: "framer-44899h",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "14px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/need_feet"
                                        })
                                    })
                                },
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/need_feet"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "120%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "/need_feet"
                                    })
                                }),
                                className: "framer-1oyhi9j",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "14px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/LQNA_LFG"
                                        })
                                    })
                                },
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/LQNA_LFG"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "120%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "/LQNA_LFG"
                                    })
                                }),
                                className: "framer-1emz4ry",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "14px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/pay_for_feet"
                                        })
                                    })
                                },
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/pay_for_feet"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "120%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "/pay_for_feet"
                                    })
                                }),
                                className: "framer-jy2gec",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "14px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/wen_ai"
                                        })
                                    })
                                },
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/wen_ai"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "120%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "/wen_ai"
                                    })
                                }),
                                className: "framer-p997jr",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "14px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/LIQUINAS_BUSSY"
                                        })
                                    })
                                },
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/LIQUINAS_BUSSY"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "120%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "/LIQUINAS_BUSSY"
                                    })
                                }),
                                className: "framer-14jqv5y",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "14px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/Last_chance_LQNA_less_than_1usd"
                                        })
                                    })
                                },
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/Last_chance_LQNA_less_than_1usd"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "120%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "/Last_chance_LQNA_less_than_1usd"
                                    })
                                }),
                                className: "framer-1puhxzl",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "14px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/send_trump_in_the_white_house"
                                        })
                                    })
                                },
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/send_trump_in_the_white_house"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "120%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "/send_trump_in_the_white_house"
                                    })
                                }),
                                className: "framer-1ur89l6",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "14px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/Send_LQNA_TO_10M"
                                        })
                                    })
                                },
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/Send_LQNA_TO_10M"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "120%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "/Send_LQNA_TO_10M"
                                    })
                                }),
                                className: "framer-1b7fotj",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "14px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/vote_liquina_right_now"
                                        })
                                    })
                                },
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/vote_liquina_right_now"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "120%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "/vote_liquina_right_now"
                                    })
                                }),
                                className: "framer-1a6nour",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "14px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/WEN_BIKINI"
                                        })
                                    })
                                },
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/WEN_BIKINI"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "120%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "/WEN_BIKINI"
                                    })
                                }),
                                className: "framer-8o0v5y",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "14px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/skimpy_bikini_roadmap"
                                        })
                                    })
                                },
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/skimpy_bikini_roadmap"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "120%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "/skimpy_bikini_roadmap"
                                    })
                                }),
                                className: "framer-nwiii0",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "14px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/BUY_LQNA_BUY_PIP_BUY_CATBAL"
                                        })
                                    })
                                },
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/BUY_LQNA_BUY_PIP_BUY_CATBAL"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "120%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "/BUY_LQNA_BUY_PIP_BUY_CATBAL"
                                    })
                                }),
                                className: "framer-edyd8a",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "14px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/dev_wake_up"
                                        })
                                    })
                                },
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/dev_wake_up"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "120%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "/dev_wake_up"
                                    })
                                }),
                                className: "framer-1felzx1",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "14px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/fuck_pip_it_gone_dip_lqna_is_the_bitch"
                                        })
                                    })
                                },
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/fuck_pip_it_gone_dip_lqna_is_the_bitch"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "120%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "/fuck_pip_it_gone_dip_lqna_is_the_bitch"
                                    })
                                }),
                                className: "framer-1lcaeop",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "14px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/hot_2d_woman_gud_tech"
                                        })
                                    })
                                },
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/hot_2d_woman_gud_tech"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "120%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "/hot_2d_woman_gud_tech"
                                    })
                                }),
                                className: "framer-u47cg7",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "14px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/queenmakeeerrr"
                                        })
                                    })
                                },
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/queenmakeeerrr"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "120%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "/queenmakeeerrr"
                                    })
                                }),
                                className: "framer-1fnuy76",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "14px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/SELL_PIP_BUY_LQNA"
                                        })
                                    })
                                },
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/SELL_PIP_BUY_LQNA"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "120%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "/SELL_PIP_BUY_LQNA"
                                    })
                                }),
                                className: "framer-46b0k1",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "14px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/Catbal_is_behind_this_sell_while_you_can"
                                        })
                                    })
                                },
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/Catbal_is_behind_this_sell_while_you_can"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "120%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "/Catbal_is_behind_this_sell_while_you_can"
                                    })
                                }),
                                className: "framer-78a030",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "14px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/deeeeeeeeeeeev"
                                        })
                                    })
                                },
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/deeeeeeeeeeeev"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "120%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "/deeeeeeeeeeeev"
                                    })
                                }),
                                className: "framer-1fgkigr",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        }), e(f, {
                            breakpoint: n,
                            overrides: {
                                BE_1LvUPA: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "14px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/BUY_PIP_BUY_LQNA"
                                        })
                                    })
                                },
                                tbgdi9qHR: {
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-size": "12px",
                                                "--framer-font-weight": "500",
                                                "--framer-line-height": "120%",
                                                "--framer-text-alignment": "center",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "/BUY_PIP_BUY_LQNA"
                                        })
                                    })
                                }
                            },
                            children: e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "120%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "/BUY_PIP_BUY_LQNA"
                                    })
                                }),
                                className: "framer-iv9mo0",
                                fonts: ["GF;Orbitron-500"],
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })
                        })]
                    })]
                }), e(ne, {
                    children: e(Ye, {
                        className: "framer-1ho5t6j-container",
                        children: e(Fe, {
                            alignment: "center",
                            direction: "left",
                            fadeOptions: {
                                fadeAlpha: 0,
                                fadeContent: !0,
                                fadeInset: 0,
                                fadeWidth: 25,
                                overflow: !1
                            },
                            gap: 10,
                            height: "100%",
                            hoverFactor: 1,
                            id: "IUJrkdm2Q",
                            layoutId: "IUJrkdm2Q",
                            padding: 10,
                            paddingBottom: 10,
                            paddingLeft: 10,
                            paddingPerSide: !1,
                            paddingRight: 10,
                            paddingTop: 10,
                            sizingOptions: {
                                heightType: !0,
                                widthType: !0
                            },
                            slots: [b(O.div, {
                                className: "framer-19o8mp9",
                                children: [e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-yibb0b",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                }), e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-1c4362k",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                }), e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-1p3zl87",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                }), e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-t1j2gt",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                }), e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-o1etyc",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                }), e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-vmtilf",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                }), e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-1f5czy2",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                }), e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-1ucxv5u",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                })]
                            })],
                            speed: 64,
                            style: {
                                height: "100%",
                                width: "100%"
                            },
                            width: "100%"
                        })
                    })
                }), b(Hr, {
                    animate: Er,
                    className: "framer-1ua657i",
                    "data-framer-appear-id": "1ua657i",
                    initial: zr,
                    optimized: !0,
                    children: [e(f, {
                        breakpoint: n,
                        overrides: {
                            BE_1LvUPA: {
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "20px",
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "160%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "rgb(255, 255, 255)"
                                        },
                                        children: "Pictorial"
                                    })
                                })
                            },
                            tbgdi9qHR: {
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "160%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "rgb(255, 255, 255)"
                                        },
                                        children: "Pictorial"
                                    })
                                })
                            }
                        },
                        children: e(l, {
                            __fromCanvasComponent: !0,
                            children: e(a, {
                                children: e("p", {
                                    style: {
                                        "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                        "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                        "--framer-font-size": "24px",
                                        "--framer-font-weight": "500",
                                        "--framer-line-height": "160%",
                                        "--framer-text-alignment": "center",
                                        "--framer-text-color": "rgb(255, 255, 255)"
                                    },
                                    children: "Pictorial"
                                })
                            }),
                            className: "framer-1goz4rd",
                            fonts: ["GF;Orbitron-500"],
                            verticalAlignment: "top",
                            withExternalLayout: !0
                        })
                    }), e(ne, {
                        children: e(Xt, {
                            __framer__animate: {
                                transition: Jt
                            },
                            __framer__animateOnce: !0,
                            __framer__enter: it,
                            __framer__exit: Ga,
                            __framer__styleAppearEffectEnabled: !0,
                            __framer__threshold: .5,
                            __perspectiveFX: !1,
                            __targetOpacity: 1,
                            className: "framer-1n1wnys-container",
                            children: e(U, {
                                alignment: "center",
                                arrowOptions: {
                                    arrowFill: "rgba(9, 39, 34, 0.4)",
                                    arrowGap: 10,
                                    arrowPadding: 16,
                                    arrowPaddingBottom: 0,
                                    arrowPaddingLeft: 0,
                                    arrowPaddingRight: 0,
                                    arrowPaddingTop: 0,
                                    arrowPosition: "auto",
                                    arrowRadius: 40,
                                    arrowShouldFadeIn: !1,
                                    arrowShouldSpace: !0,
                                    arrowSize: 40,
                                    showMouseControls: !0
                                },
                                autoPlayControl: !0,
                                borderRadius: 16,
                                direction: "right",
                                dragControl: !0,
                                effectsOptions: {
                                    effectsHover: !0,
                                    effectsOpacity: 1,
                                    effectsPerspective: 1200,
                                    effectsRotate: 0,
                                    effectsScale: 1
                                },
                                fadeOptions: {
                                    fadeAlpha: 0,
                                    fadeContent: !1,
                                    fadeInset: 0,
                                    fadeWidth: 25,
                                    overflow: !1
                                },
                                gap: 16,
                                height: "100%",
                                id: "YhZ1yW239",
                                intervalControl: 4,
                                itemAmount: 1,
                                layoutId: "YhZ1yW239",
                                padding: 0,
                                paddingBottom: 0,
                                paddingLeft: 0,
                                paddingPerSide: !1,
                                paddingRight: 0,
                                paddingTop: 0,
                                progressOptions: {
                                    dotsActiveOpacity: 1,
                                    dotsBackground: "rgba(9, 39, 34, 0.4)",
                                    dotsBlur: 0,
                                    dotsFill: "rgb(255, 255, 255)",
                                    dotsGap: 10,
                                    dotsInset: 10,
                                    dotSize: 10,
                                    dotsOpacity: .5,
                                    dotsPadding: 10,
                                    dotsRadius: 50,
                                    showProgressDots: !0
                                },
                                slots: [e($, {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "1500px",
                                        src: "./framerusercontent.com/images/BWEaHaepfpfvhjyUTfuhViWC4Y.png",
                                        srcSet: "./framerusercontent.com/images/BWEaHaepfpfvhjyUTfuhViWC4Y.png?scale-down-to=512 512w,./framerusercontent.com/images/BWEaHaepfpfvhjyUTfuhViWC4Y.png?scale-down-to=1024 1024w,./framerusercontent.com/images/BWEaHaepfpfvhjyUTfuhViWC4Y.png 1500w"
                                    },
                                    className: "framer-1mxsdfg",
                                    "data-framer-name": "Sexy pack_01",
                                    name: "Sexy pack_01"
                                }), e($, {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 1500,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 1500,
                                        pixelWidth: 1500,
                                        sizes: "1500px",
                                        src: "./framerusercontent.com/images/ItSRIn1miXUwNK3uAadd2LZPu4.png",
                                        srcSet: "./framerusercontent.com/images/ItSRIn1miXUwNK3uAadd2LZPu4.png?scale-down-to=512 512w,./framerusercontent.com/images/ItSRIn1miXUwNK3uAadd2LZPu4.png?scale-down-to=1024 1024w,./framerusercontent.com/images/ItSRIn1miXUwNK3uAadd2LZPu4.png 1500w"
                                    },
                                    className: "framer-n272j0",
                                    "data-framer-name": "Sexy pack_02",
                                    name: "Sexy pack_02"
                                })],
                                startFrom: 0,
                                style: {
                                    height: "100%",
                                    maxWidth: "100%",
                                    width: "100%"
                                },
                                transitionControl: {
                                    damping: 40,
                                    delay: 0,
                                    mass: 1,
                                    stiffness: 200,
                                    type: "spring"
                                },
                                width: "100%"
                            })
                        })
                    })]
                }), e(ne, {
                    children: e(Ye, {
                        className: "framer-12t0qq7-container",
                        children: e(Fe, {
                            alignment: "center",
                            direction: "left",
                            fadeOptions: {
                                fadeAlpha: 0,
                                fadeContent: !0,
                                fadeInset: 0,
                                fadeWidth: 25,
                                overflow: !1
                            },
                            gap: 10,
                            height: "100%",
                            hoverFactor: 1,
                            id: "ZkRnxZKfi",
                            layoutId: "ZkRnxZKfi",
                            padding: 10,
                            paddingBottom: 10,
                            paddingLeft: 10,
                            paddingPerSide: !1,
                            paddingRight: 10,
                            paddingTop: 10,
                            sizingOptions: {
                                heightType: !0,
                                widthType: !0
                            },
                            slots: [b(O.div, {
                                className: "framer-19o8mp9",
                                children: [e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-yibb0b",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                }), e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-1c4362k",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                }), e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-1p3zl87",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                }), e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-t1j2gt",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                }), e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-o1etyc",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                }), e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-vmtilf",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                }), e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-1f5czy2",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                }), e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-1ucxv5u",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                })]
                            })],
                            speed: 64,
                            style: {
                                height: "100%",
                                width: "100%"
                            },
                            width: "100%"
                        })
                    })
                }), b(Hr, {
                    animate: Er,
                    className: "framer-1vyi2l6",
                    "data-framer-appear-id": "1vyi2l6",
                    initial: zr,
                    optimized: !0,
                    children: [e(f, {
                        breakpoint: n,
                        overrides: {
                            BE_1LvUPA: {
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "20px",
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "160%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "rgb(255, 255, 255)"
                                        },
                                        children: "Community Toon"
                                    })
                                })
                            },
                            tbgdi9qHR: {
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "160%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "rgb(255, 255, 255)"
                                        },
                                        children: "Community Toon"
                                    })
                                })
                            }
                        },
                        children: e(l, {
                            __fromCanvasComponent: !0,
                            children: e(a, {
                                children: e("p", {
                                    style: {
                                        "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                        "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                        "--framer-font-size": "24px",
                                        "--framer-font-weight": "500",
                                        "--framer-line-height": "160%",
                                        "--framer-text-alignment": "center",
                                        "--framer-text-color": "rgb(255, 255, 255)"
                                    },
                                    children: "Community Toon"
                                })
                            }),
                            className: "framer-lobd7u",
                            fonts: ["GF;Orbitron-500"],
                            verticalAlignment: "top",
                            withExternalLayout: !0
                        })
                    }), e(ne, {
                        children: e(Xt, {
                            __framer__animate: {
                                transition: Jt
                            },
                            __framer__animateOnce: !0,
                            __framer__enter: it,
                            __framer__exit: Ga,
                            __framer__styleAppearEffectEnabled: !0,
                            __framer__threshold: .5,
                            __perspectiveFX: !1,
                            __targetOpacity: 1,
                            className: "framer-17lcnj7-container",
                            children: e(U, {
                                alignment: "center",
                                arrowOptions: {
                                    arrowFill: "rgba(9, 39, 34, 0.4)",
                                    arrowGap: 10,
                                    arrowPadding: 16,
                                    arrowPaddingBottom: 0,
                                    arrowPaddingLeft: 0,
                                    arrowPaddingRight: 0,
                                    arrowPaddingTop: 0,
                                    arrowPosition: "auto",
                                    arrowRadius: 40,
                                    arrowShouldFadeIn: !1,
                                    arrowShouldSpace: !0,
                                    arrowSize: 40,
                                    showMouseControls: !0
                                },
                                autoPlayControl: !0,
                                borderRadius: 16,
                                direction: "right",
                                dragControl: !0,
                                effectsOptions: {
                                    effectsHover: !0,
                                    effectsOpacity: 1,
                                    effectsPerspective: 1200,
                                    effectsRotate: 0,
                                    effectsScale: 1
                                },
                                fadeOptions: {
                                    fadeAlpha: 0,
                                    fadeContent: !1,
                                    fadeInset: 0,
                                    fadeWidth: 25,
                                    overflow: !1
                                },
                                gap: 16,
                                height: "100%",
                                id: "l3iiaoepv",
                                intervalControl: 4,
                                itemAmount: 1,
                                layoutId: "l3iiaoepv",
                                padding: 0,
                                paddingBottom: 0,
                                paddingLeft: 0,
                                paddingPerSide: !1,
                                paddingRight: 0,
                                paddingTop: 0,
                                progressOptions: {
                                    dotsActiveOpacity: 1,
                                    dotsBackground: "rgba(9, 39, 34, 0.4)",
                                    dotsBlur: 0,
                                    dotsFill: "rgb(255, 255, 255)",
                                    dotsGap: 10,
                                    dotsInset: 10,
                                    dotSize: 10,
                                    dotsOpacity: .5,
                                    dotsPadding: 10,
                                    dotsRadius: 50,
                                    showProgressDots: !0
                                },
                                slots: [e($, {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 2065,
                                        intrinsicWidth: 1500,
                                        pixelHeight: 2065,
                                        pixelWidth: 1500,
                                        sizes: "1500px",
                                        src: "./framerusercontent.com/images/CdVtWgQRqcOsJZ99pxxnPogDaCw.png",
                                        srcSet: "./framerusercontent.com/images/CdVtWgQRqcOsJZ99pxxnPogDaCw.png?scale-down-to=1024 743w,./framerusercontent.com/images/CdVtWgQRqcOsJZ99pxxnPogDaCw.png?scale-down-to=2048 1487w,./framerusercontent.com/images/CdVtWgQRqcOsJZ99pxxnPogDaCw.png 1500w"
                                    },
                                    className: "framer-m9ono3",
                                    "data-framer-name": "Community toon 02_catbozio",
                                    name: "Community toon 02_catbozio"
                                }), e($, {
                                    background: {
                                        alt: "",
                                        fit: "fill",
                                        intrinsicHeight: 2606,
                                        intrinsicWidth: 1893,
                                        pixelHeight: 2606,
                                        pixelWidth: 1893,
                                        sizes: "1500px",
                                        src: "./framerusercontent.com/images/8PEkoVxwD2ZipSVhuyJa6cwSLj8.png",
                                        srcSet: "./framerusercontent.com/images/8PEkoVxwD2ZipSVhuyJa6cwSLj8.png?scale-down-to=1024 743w,./framerusercontent.com/images/8PEkoVxwD2ZipSVhuyJa6cwSLj8.png?scale-down-to=2048 1487w,./framerusercontent.com/images/8PEkoVxwD2ZipSVhuyJa6cwSLj8.png 1893w"
                                    },
                                    className: "framer-1x7mhmj",
                                    "data-framer-name": "Community Toon 01",
                                    name: "Community Toon 01"
                                })],
                                startFrom: 0,
                                style: {
                                    height: "100%",
                                    maxWidth: "100%",
                                    width: "100%"
                                },
                                transitionControl: {
                                    damping: 40,
                                    delay: 0,
                                    mass: 1,
                                    stiffness: 200,
                                    type: "spring"
                                },
                                width: "100%"
                            })
                        })
                    })]
                }), e(ne, {
                    children: e(Ye, {
                        className: "framer-fj4g4b-container",
                        children: e(Fe, {
                            alignment: "center",
                            direction: "left",
                            fadeOptions: {
                                fadeAlpha: 0,
                                fadeContent: !0,
                                fadeInset: 0,
                                fadeWidth: 25,
                                overflow: !1
                            },
                            gap: 10,
                            height: "100%",
                            hoverFactor: 1,
                            id: "XWMEpTdph",
                            layoutId: "XWMEpTdph",
                            padding: 10,
                            paddingBottom: 10,
                            paddingLeft: 10,
                            paddingPerSide: !1,
                            paddingRight: 10,
                            paddingTop: 10,
                            sizingOptions: {
                                heightType: !0,
                                widthType: !0
                            },
                            slots: [b(O.div, {
                                className: "framer-19o8mp9",
                                children: [e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-yibb0b",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                }), e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-1c4362k",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                }), e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-1p3zl87",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                }), e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-t1j2gt",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                }), e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-o1etyc",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                }), e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-vmtilf",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                }), e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-1f5czy2",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                }), e(l, {
                                    __fromCanvasComponent: !0,
                                    children: e(a, {
                                        children: e("p", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                                "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                                "--framer-font-weight": "500",
                                                "--framer-letter-spacing": "4px",
                                                "--framer-line-height": "160%",
                                                "--framer-text-color": "var(--token-42952042-5228-404e-9924-2ca52934dbb4, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN"
                                        })
                                    }),
                                    className: "framer-1ucxv5u",
                                    fonts: ["GF;Orbitron-500"],
                                    verticalAlignment: "top",
                                    withExternalLayout: !0
                                })]
                            })],
                            speed: 64,
                            style: {
                                height: "100%",
                                width: "100%"
                            },
                            width: "100%"
                        })
                    })
                }), b(Hr, {
                    animate: Er,
                    className: "framer-tgfpuh",
                    "data-framer-appear-id": "tgfpuh",
                    initial: zr,
                    optimized: !0,
                    children: [e(f, {
                        breakpoint: n,
                        overrides: {
                            BE_1LvUPA: {
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "20px",
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "160%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "rgb(255, 255, 255)"
                                        },
                                        children: "Queen Making"
                                    })
                                })
                            },
                            tbgdi9qHR: {
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-weight": "500",
                                            "--framer-line-height": "160%",
                                            "--framer-text-alignment": "center",
                                            "--framer-text-color": "rgb(255, 255, 255)"
                                        },
                                        children: "Queen Making"
                                    })
                                })
                            }
                        },
                        children: e(l, {
                            __fromCanvasComponent: !0,
                            children: e(a, {
                                children: e("p", {
                                    style: {
                                        "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                        "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                        "--framer-font-size": "24px",
                                        "--framer-font-weight": "500",
                                        "--framer-line-height": "160%",
                                        "--framer-text-alignment": "center",
                                        "--framer-text-color": "rgb(255, 255, 255)"
                                    },
                                    children: "Queen Making"
                                })
                            }),
                            className: "framer-88oal6",
                            fonts: ["GF;Orbitron-500"],
                            verticalAlignment: "top",
                            withExternalLayout: !0
                        })
                    }), b("div", {
                        className: "framer-1s6mnv3",
                        children: [b("div", {
                            className: "framer-11aekwg",
                            children: [e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "12px",
                                            "--framer-font-weight": "500",
                                            "--framer-letter-spacing": "0px",
                                            "--framer-line-height": "120%",
                                            "--framer-text-color": "rgba(255, 255, 255, 0.64)"
                                        },
                                        children: "Avatar Design"
                                    })
                                }),
                                className: "framer-1w1xcyu",
                                fonts: ["GF;Orbitron-500"],
                                transformTemplate: W,
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            }), e(ge, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: we,
                                __framer__exit: xe,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                className: "framer-th2yap",
                                "data-framer-name": "Image",
                                name: "Image"
                            }), e(se, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: ye,
                                __framer__exit: ve,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __fromCanvasComponent: !0,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNzAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "14px",
                                            "--framer-font-weight": "700",
                                            "--framer-letter-spacing": "0px",
                                            "--framer-line-height": "100%",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "COMPLETE"
                                    })
                                }),
                                className: "framer-5bfha1",
                                fonts: ["GF;Orbitron-700"],
                                transformTemplate: W,
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })]
                        }), b("div", {
                            className: "framer-9qd3oo",
                            children: [e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "12px",
                                            "--framer-font-weight": "500",
                                            "--framer-letter-spacing": "0px",
                                            "--framer-line-height": "120%",
                                            "--framer-text-color": "rgba(255, 255, 255, 0.64)"
                                        },
                                        children: "Visual Identity"
                                    })
                                }),
                                className: "framer-1tvhrug",
                                fonts: ["GF;Orbitron-500"],
                                transformTemplate: W,
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            }), e(se, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: ye,
                                __framer__exit: ve,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __fromCanvasComponent: !0,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNzAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "14px",
                                            "--framer-font-weight": "700",
                                            "--framer-letter-spacing": "0px",
                                            "--framer-line-height": "100%",
                                            "--framer-text-color": "rgb(150, 252, 229)"
                                        },
                                        children: "90%"
                                    })
                                }),
                                className: "framer-kevebf",
                                fonts: ["GF;Orbitron-700"],
                                transformTemplate: W,
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            }), e(ge, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: we,
                                __framer__exit: xe,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                className: "framer-uw3wn5",
                                "data-framer-name": "Image",
                                name: "Image"
                            })]
                        }), b("div", {
                            className: "framer-ntu4to",
                            children: [e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "12px",
                                            "--framer-font-weight": "500",
                                            "--framer-letter-spacing": "0px",
                                            "--framer-line-height": "120%",
                                            "--framer-text-color": "rgba(255, 255, 255, 0.64)"
                                        },
                                        children: "Character Traits"
                                    })
                                }),
                                className: "framer-psim6d",
                                fonts: ["GF;Orbitron-500"],
                                transformTemplate: W,
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            }), e(ge, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: we,
                                __framer__exit: xe,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                className: "framer-160nrzm",
                                "data-framer-name": "Image",
                                name: "Image"
                            }), e(se, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: ye,
                                __framer__exit: ve,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __fromCanvasComponent: !0,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNzAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "14px",
                                            "--framer-font-weight": "700",
                                            "--framer-letter-spacing": "0px",
                                            "--framer-line-height": "100%",
                                            "--framer-text-color": "rgb(150, 252, 229)"
                                        },
                                        children: "90%"
                                    })
                                }),
                                className: "framer-dcql47",
                                fonts: ["GF;Orbitron-700"],
                                transformTemplate: W,
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })]
                        }), b("div", {
                            className: "framer-1l41sf0",
                            children: [e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "12px",
                                            "--framer-font-weight": "500",
                                            "--framer-letter-spacing": "0px",
                                            "--framer-line-height": "120%",
                                            "--framer-text-color": "rgba(255, 255, 255, 0.64)"
                                        },
                                        children: "Communication System"
                                    })
                                }),
                                className: "framer-aqpggg",
                                fonts: ["GF;Orbitron-500"],
                                transformTemplate: W,
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            }), e(ge, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: we,
                                __framer__exit: xe,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                className: "framer-q25hmt",
                                "data-framer-name": "Image",
                                name: "Image"
                            }), e(se, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: ye,
                                __framer__exit: ve,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __fromCanvasComponent: !0,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNzAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "14px",
                                            "--framer-font-weight": "700",
                                            "--framer-letter-spacing": "0px",
                                            "--framer-line-height": "100%",
                                            "--framer-text-color": "rgb(150, 252, 229)"
                                        },
                                        children: "70%"
                                    })
                                }),
                                className: "framer-4jcmui",
                                fonts: ["GF;Orbitron-700"],
                                transformTemplate: W,
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })]
                        }), b("div", {
                            className: "framer-1u6vwui",
                            children: [e(ge, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: we,
                                __framer__exit: xe,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                className: "framer-1aas75l",
                                "data-framer-name": "Image",
                                name: "Image"
                            }), e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "12px",
                                            "--framer-font-weight": "500",
                                            "--framer-letter-spacing": "0px",
                                            "--framer-line-height": "120%",
                                            "--framer-text-color": "rgba(255, 255, 255, 0.64)"
                                        },
                                        children: "Ethical Standards and Guidelines"
                                    })
                                }),
                                className: "framer-rvc11k",
                                fonts: ["GF;Orbitron-500"],
                                transformTemplate: W,
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            }), e(se, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: ye,
                                __framer__exit: ve,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __fromCanvasComponent: !0,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNzAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "14px",
                                            "--framer-font-weight": "700",
                                            "--framer-letter-spacing": "0px",
                                            "--framer-line-height": "100%",
                                            "--framer-text-color": "rgb(150, 252, 229)"
                                        },
                                        children: "60%"
                                    })
                                }),
                                className: "framer-1yf6nuh",
                                fonts: ["GF;Orbitron-700"],
                                transformTemplate: W,
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })]
                        }), b("div", {
                            className: "framer-kzkboa",
                            children: [e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "12px",
                                            "--framer-font-weight": "500",
                                            "--framer-letter-spacing": "0px",
                                            "--framer-line-height": "120%",
                                            "--framer-text-color": "rgba(255, 255, 255, 0.64)"
                                        },
                                        children: "Learning System"
                                    })
                                }),
                                className: "framer-1p9s8t",
                                fonts: ["GF;Orbitron-500"],
                                transformTemplate: W,
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            }), e(ge, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: we,
                                __framer__exit: xe,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                className: "framer-1xsr9qu",
                                "data-framer-name": "Image",
                                name: "Image"
                            }), e(se, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: ye,
                                __framer__exit: ve,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __fromCanvasComponent: !0,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNzAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "14px",
                                            "--framer-font-weight": "700",
                                            "--framer-letter-spacing": "0px",
                                            "--framer-line-height": "100%",
                                            "--framer-text-color": "rgb(150, 252, 229)"
                                        },
                                        children: "60%"
                                    })
                                }),
                                className: "framer-a53jz2",
                                fonts: ["GF;Orbitron-700"],
                                transformTemplate: W,
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })]
                        }), b("div", {
                            className: "framer-1d1prco",
                            children: [e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "12px",
                                            "--framer-font-weight": "500",
                                            "--framer-letter-spacing": "0px",
                                            "--framer-line-height": "120%",
                                            "--framer-text-color": "rgba(255, 255, 255, 0.64)"
                                        },
                                        children: "Profesiona (Closed) Contents Pool"
                                    })
                                }),
                                className: "framer-19u7hlf",
                                fonts: ["GF;Orbitron-500"],
                                transformTemplate: W,
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            }), e(ge, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: we,
                                __framer__exit: xe,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                className: "framer-1llnngt",
                                "data-framer-name": "Image",
                                name: "Image"
                            }), e(se, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: ye,
                                __framer__exit: ve,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __fromCanvasComponent: !0,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNzAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "14px",
                                            "--framer-font-weight": "700",
                                            "--framer-letter-spacing": "0px",
                                            "--framer-line-height": "100%",
                                            "--framer-text-color": "rgb(150, 252, 229)"
                                        },
                                        children: "60%"
                                    })
                                }),
                                className: "framer-s5q7o5",
                                fonts: ["GF;Orbitron-700"],
                                transformTemplate: W,
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })]
                        }), b("div", {
                            className: "framer-ikxvyh",
                            children: [e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "12px",
                                            "--framer-font-weight": "500",
                                            "--framer-letter-spacing": "0px",
                                            "--framer-line-height": "120%",
                                            "--framer-text-color": "rgba(255, 255, 255, 0.64)"
                                        },
                                        children: "Community Building"
                                    })
                                }),
                                className: "framer-qpu6w9",
                                fonts: ["GF;Orbitron-500"],
                                transformTemplate: W,
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            }), e(ge, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: we,
                                __framer__exit: xe,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                className: "framer-ebykwv",
                                "data-framer-name": "Image",
                                name: "Image"
                            }), e(se, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: ye,
                                __framer__exit: ve,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __fromCanvasComponent: !0,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNzAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "14px",
                                            "--framer-font-weight": "700",
                                            "--framer-letter-spacing": "0px",
                                            "--framer-line-height": "100%",
                                            "--framer-text-color": "rgb(150, 252, 229)"
                                        },
                                        children: "50%"
                                    })
                                }),
                                className: "framer-z87cn4",
                                fonts: ["GF;Orbitron-700"],
                                transformTemplate: W,
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })]
                        }), b("div", {
                            className: "framer-g82w2b",
                            children: [e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "12px",
                                            "--framer-font-weight": "500",
                                            "--framer-letter-spacing": "0px",
                                            "--framer-line-height": "120%",
                                            "--framer-text-color": "rgba(255, 255, 255, 0.64)"
                                        },
                                        children: "Monitoring and Performance Evaluation"
                                    })
                                }),
                                className: "framer-1reprgt",
                                fonts: ["GF;Orbitron-500"],
                                transformTemplate: W,
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            }), e(ge, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: we,
                                __framer__exit: xe,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                className: "framer-sq6q52",
                                "data-framer-name": "Image",
                                name: "Image"
                            }), e(se, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: ye,
                                __framer__exit: ve,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __fromCanvasComponent: !0,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNzAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "14px",
                                            "--framer-font-weight": "700",
                                            "--framer-letter-spacing": "0px",
                                            "--framer-line-height": "100%",
                                            "--framer-text-color": "rgb(150, 252, 229)"
                                        },
                                        children: "40%"
                                    })
                                }),
                                className: "framer-n31afk",
                                fonts: ["GF;Orbitron-700"],
                                transformTemplate: W,
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })]
                        }), b("div", {
                            className: "framer-4wfxnk",
                            children: [e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "12px",
                                            "--framer-font-weight": "500",
                                            "--framer-letter-spacing": "0px",
                                            "--framer-line-height": "120%",
                                            "--framer-text-color": "rgba(255, 255, 255, 0.64)"
                                        },
                                        children: "Interactive Front-End UX"
                                    })
                                }),
                                className: "framer-cp3up4",
                                fonts: ["GF;Orbitron-500"],
                                transformTemplate: W,
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            }), e(ge, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: we,
                                __framer__exit: xe,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                className: "framer-sk23ss",
                                "data-framer-name": "Image",
                                name: "Image"
                            }), e(se, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: ye,
                                __framer__exit: ve,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __fromCanvasComponent: !0,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNzAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "14px",
                                            "--framer-font-weight": "700",
                                            "--framer-letter-spacing": "0px",
                                            "--framer-line-height": "100%",
                                            "--framer-text-color": "rgb(150, 252, 229)"
                                        },
                                        children: "40%"
                                    })
                                }),
                                className: "framer-jdhj9",
                                fonts: ["GF;Orbitron-700"],
                                transformTemplate: W,
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })]
                        }), b("div", {
                            className: "framer-13h9jg",
                            children: [e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "12px",
                                            "--framer-font-weight": "500",
                                            "--framer-letter-spacing": "0px",
                                            "--framer-line-height": "120%",
                                            "--framer-text-color": "rgba(255, 255, 255, 0.64)"
                                        },
                                        children: "Community (Open) Contents Pool"
                                    })
                                }),
                                className: "framer-1o4p4qt",
                                fonts: ["GF;Orbitron-500"],
                                transformTemplate: W,
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            }), e(ge, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: we,
                                __framer__exit: xe,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                className: "framer-1yq6bho",
                                "data-framer-name": "Image",
                                name: "Image"
                            }), e(se, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: ye,
                                __framer__exit: ve,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __fromCanvasComponent: !0,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNzAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "14px",
                                            "--framer-font-weight": "700",
                                            "--framer-letter-spacing": "0px",
                                            "--framer-line-height": "100%",
                                            "--framer-text-color": "rgb(150, 252, 229)"
                                        },
                                        children: "20%"
                                    })
                                }),
                                className: "framer-sbnebz",
                                fonts: ["GF;Orbitron-700"],
                                transformTemplate: W,
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })]
                        }), b("div", {
                            className: "framer-1mbjgn3",
                            children: [e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "12px",
                                            "--framer-font-weight": "500",
                                            "--framer-letter-spacing": "0px",
                                            "--framer-line-height": "120%",
                                            "--framer-text-color": "rgba(255, 255, 255, 0.64)"
                                        },
                                        children: "Data Analysis System"
                                    })
                                }),
                                className: "framer-cro38v",
                                fonts: ["GF;Orbitron-500"],
                                transformTemplate: W,
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            }), e(ge, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: we,
                                __framer__exit: xe,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                className: "framer-dbsyy7",
                                "data-framer-name": "Image",
                                name: "Image"
                            }), e(se, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: ye,
                                __framer__exit: ve,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __fromCanvasComponent: !0,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNzAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "14px",
                                            "--framer-font-weight": "700",
                                            "--framer-letter-spacing": "0px",
                                            "--framer-line-height": "100%",
                                            "--framer-text-color": "rgb(150, 252, 229)"
                                        },
                                        children: "10%"
                                    })
                                }),
                                className: "framer-1a2ln7l",
                                fonts: ["GF;Orbitron-700"],
                                transformTemplate: W,
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })]
                        }), b("div", {
                            className: "framer-oxtvdc",
                            children: [e(l, {
                                __fromCanvasComponent: !0,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNTAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "12px",
                                            "--framer-font-weight": "500",
                                            "--framer-letter-spacing": "0px",
                                            "--framer-line-height": "120%",
                                            "--framer-text-color": "rgba(255, 255, 255, 0.64)"
                                        },
                                        children: "\u2026and more"
                                    })
                                }),
                                className: "framer-16f2dfe",
                                fonts: ["GF;Orbitron-500"],
                                transformTemplate: W,
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            }), e(ge, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: we,
                                __framer__exit: xe,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                className: "framer-19qld7p",
                                "data-framer-name": "Image",
                                name: "Image"
                            }), e(se, {
                                __framer__animate: {
                                    transition: d
                                },
                                __framer__animateOnce: !1,
                                __framer__enter: ye,
                                __framer__exit: ve,
                                __framer__styleAppearEffectEnabled: !0,
                                __framer__threshold: .5,
                                __fromCanvasComponent: !0,
                                __perspectiveFX: !1,
                                __targetOpacity: 1,
                                children: e(a, {
                                    children: e("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNzAw",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "14px",
                                            "--framer-font-weight": "700",
                                            "--framer-letter-spacing": "0px",
                                            "--framer-line-height": "100%",
                                            "--framer-text-color": "rgb(150, 252, 229)"
                                        },
                                        children: "-%"
                                    })
                                }),
                                className: "framer-1xzbrqc",
                                fonts: ["GF;Orbitron-700"],
                                transformTemplate: W,
                                verticalAlignment: "top",
                                withExternalLayout: !0
                            })]
                        })]
                    })]
                }), e("div", {
                    className: "framer-z8qu71",
                    children: e(f, {
                        breakpoint: n,
                        overrides: {
                            BE_1LvUPA: {
                                children: e(a, {
                                    children: b("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tcmVndWxhcg==",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "14px",
                                            "--framer-line-height": "100%",
                                            "--framer-text-color": "rgb(255, 255, 255)"
                                        },
                                        children: ["\u24D2 QueenMaker & ", e("span", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNzAw",
                                                "--framer-font-weight": "700",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN Holder"
                                        }), " all rights reserved."]
                                    })
                                })
                            },
                            tbgdi9qHR: {
                                children: e(a, {
                                    children: b("p", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tcmVndWxhcg==",
                                            "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                            "--framer-font-size": "12px",
                                            "--framer-line-height": "100%",
                                            "--framer-text-color": "rgb(255, 255, 255)"
                                        },
                                        children: ["\u24D2 QueenMaker & ", e("span", {
                                            style: {
                                                "--font-selector": "R0Y7T3JiaXRyb24tNzAw",
                                                "--framer-font-weight": "700",
                                                "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                            },
                                            children: "$HYPERCHAN Holder"
                                        }), " all rights reserved."]
                                    })
                                })
                            }
                        },
                        children: e(l, {
                            __fromCanvasComponent: !0,
                            children: e(a, {
                                children: b("p", {
                                    style: {
                                        "--font-selector": "R0Y7T3JiaXRyb24tcmVndWxhcg==",
                                        "--framer-font-family": '"Orbitron", "Orbitron Placeholder", sans-serif',
                                        "--framer-line-height": "100%",
                                        "--framer-text-color": "rgb(255, 255, 255)"
                                    },
                                    children: ["\u24D2 QueenMaker & ", e("span", {
                                        style: {
                                            "--font-selector": "R0Y7T3JiaXRyb24tNzAw",
                                            "--framer-font-weight": "700",
                                            "--framer-text-color": "var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, rgb(150, 252, 229))"
                                        },
                                        children: "$HYPERCHAN Holder"
                                    }), " all rights reserved."]
                                })
                            }),
                            className: "framer-4b845s",
                            fonts: ["GF;Orbitron-regular", "GF;Orbitron-700"],
                            verticalAlignment: "top",
                            withExternalLayout: !0
                        })
                    })
                })]
            }), e("div", {
                className: Xe(Da, ...v),
                id: "overlay"
            })]
        })
    })
})
  , Eo = ["@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }", `.${Ut.bodyClassName}-framer-oYeZ4 { background: rgb(9, 39, 34); }`, ".framer-oYeZ4.framer-163rb, .framer-oYeZ4 .framer-163rb { display: block; }", ".framer-oYeZ4.framer-xfymdx { align-content: center; align-items: center; background-color: #092722; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 16px; height: min-content; justify-content: flex-start; overflow: hidden; padding: 16px; position: relative; width: 960px; }", ".framer-oYeZ4 .framer-1pqmipk { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; height: min-content; justify-content: space-between; overflow: hidden; padding: 8px; position: relative; width: 100%; }", ".framer-oYeZ4 .framer-1q844k3 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 12px; height: min-content; justify-content: center; overflow: hidden; padding: 0px; position: relative; width: min-content; }", ".framer-oYeZ4 .framer-1x6lpdb-container { aspect-ratio: 1 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 48px); position: relative; width: 48px; }", ".framer-oYeZ4 .framer-1lctmcd, .framer-oYeZ4 .framer-1b7bkkl, .framer-oYeZ4 .framer-4cvhge, .framer-oYeZ4 .framer-1j5c1l0, .framer-oYeZ4 .framer-1gnspp3, .framer-oYeZ4 .framer-6hycsh, .framer-oYeZ4 .framer-1iyt4qm, .framer-oYeZ4 .framer-16stspt, .framer-oYeZ4 .framer-d0oqx0, .framer-oYeZ4 .framer-yibb0b, .framer-oYeZ4 .framer-1c4362k, .framer-oYeZ4 .framer-1p3zl87, .framer-oYeZ4 .framer-t1j2gt, .framer-oYeZ4 .framer-o1etyc, .framer-oYeZ4 .framer-vmtilf, .framer-oYeZ4 .framer-1f5czy2, .framer-oYeZ4 .framer-1ucxv5u, .framer-oYeZ4 .framer-4b845s { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; position: relative; white-space: pre; width: auto; }", ".framer-oYeZ4 .framer-1g86c5c { align-content: center; align-items: center; background-color: #000908; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px; border-top-left-radius: 16px; border-top-right-radius: 16px; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 24px; height: min-content; justify-content: flex-start; overflow: hidden; padding: 40px; position: relative; width: 100%; will-change: var(--framer-will-change-override, transform); }", ".framer-oYeZ4 .framer-1uo980v-container { aspect-ratio: 1 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 1114px); left: 50%; max-width: 1600px; position: absolute; top: 0px; transform: translateX(-50%); width: 120%; z-index: 1; }", ".framer-oYeZ4 .framer-pe4600 { -webkit-backdrop-filter: blur(40px); aspect-ratio: 0.944 / 1; backdrop-filter: blur(40px); background-color: rgba(0, 9, 8, 0.64); flex: none; height: var(--framer-aspect-ratio-supported, 1180px); left: 50%; min-height: 800px; overflow: hidden; position: absolute; top: 0px; transform: translateX(-50%); width: 120%; z-index: 1; }", ".framer-oYeZ4 .framer-1c3bapr-container { flex: none; height: 32px; left: calc(50.00000000000002% - 93.00847457627118% / 2); position: absolute; top: 40px; width: 93%; z-index: 1; }", ".framer-oYeZ4 .framer-12yndkz, .framer-oYeZ4 .framer-19o8mp9 { align-content: center; align-items: center; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 16px; height: 26px; justify-content: center; overflow: hidden; padding: 0px; position: relative; width: min-content; }", ".framer-oYeZ4 .framer-1e6yavm-container { aspect-ratio: 1.06 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 800px); max-width: 1200px; min-width: 480px; position: relative; width: 100%; z-index: 1; }", ".framer-oYeZ4 .framer-1kimt19 { flex: none; height: 160px; overflow: hidden; position: relative; width: 100%; z-index: 2; }", ".framer-oYeZ4 .framer-x4w8uy { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 24px; height: min-content; justify-content: center; max-width: 1080px; overflow: hidden; padding: 24px; position: relative; width: 100%; z-index: 2; }", ".framer-oYeZ4 .framer-phz79i { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; z-index: 2; }", ".framer-oYeZ4 .framer-iuu62y { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 24px; height: min-content; justify-content: center; max-width: 960px; overflow: hidden; padding: 24px; position: relative; width: 100%; z-index: 2; }", ".framer-oYeZ4 .framer-6z50ix, .framer-oYeZ4 .framer-3jmomq, .framer-oYeZ4 .framer-1goz4rd, .framer-oYeZ4 .framer-lobd7u, .framer-oYeZ4 .framer-88oal6 { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }", ".framer-oYeZ4 .framer-xg4obx { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 24px; height: min-content; justify-content: center; overflow: hidden; padding: 0px 0px 16px 0px; position: relative; width: 100%; z-index: 2; }", ".framer-oYeZ4 .framer-4t3k3r, .framer-oYeZ4 .framer-138qsgj, .framer-oYeZ4 .framer-zcf0v0, .framer-oYeZ4 .framer-1j0df96 { aspect-ratio: 1 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 64px); overflow: hidden; position: relative; text-decoration: none; width: 64px; }", ".framer-oYeZ4 .framer-1n2tijk { aspect-ratio: 1 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 94px); left: 50%; max-width: 1600px; overflow: visible; position: absolute; top: 50%; transform: translate(-50%, -50%); width: 147%; z-index: 1; }", ".framer-oYeZ4 .framer-1txjzfy-container, .framer-oYeZ4 .framer-1cw92j6-container { bottom: 0px; flex: none; left: 0px; position: absolute; right: 0px; top: 0px; }", ".framer-oYeZ4 .framer-1jttqog { aspect-ratio: 1 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 64px); overflow: visible; position: relative; text-decoration: none; width: 64px; }", ".framer-oYeZ4 .framer-5sp023 { flex: none; height: 64px; left: 5px; position: absolute; top: 0px; width: 54px; }", ".framer-oYeZ4 .framer-tb2k4l-container { flex: none; height: 24px; position: relative; width: 102%; z-index: 0; }", ".framer-oYeZ4 .framer-1i8jm4o, .framer-oYeZ4 .framer-1ua657i, .framer-oYeZ4 .framer-1vyi2l6 { align-content: center; align-items: center; background-color: #000908; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px; border-top-left-radius: 16px; border-top-right-radius: 16px; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 24px; height: min-content; justify-content: flex-start; overflow: hidden; padding: 24px; position: relative; width: 100%; will-change: var(--framer-will-change-override, transform); }", ".framer-oYeZ4 .framer-dn9trr { aspect-ratio: 2 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 440px); max-width: 1440px; overflow: hidden; position: relative; width: 100%; }", ".framer-oYeZ4 .framer-10kogrx { aspect-ratio: 1.7429193899782136 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 766px); left: 50%; max-width: 1920px; overflow: visible; position: absolute; top: -40px; transform: translateX(-50%); width: 144%; z-index: 0; }", ".framer-oYeZ4 .framer-13qstjm, .framer-oYeZ4 .framer-1r0laeg, .framer-oYeZ4 .framer-1neybzu, .framer-oYeZ4 .framer-1ri45bd, .framer-oYeZ4 .framer-s9rwda, .framer-oYeZ4 .framer-2g9oob { flex: none; height: 100%; left: 0px; overflow: visible; position: absolute; top: 0px; width: 100%; }", ".framer-oYeZ4 .framer-1oi1wyi { aspect-ratio: 4.916201117318436 / 1; background: linear-gradient(180deg, rgba(0, 9, 8, 0) 0%, rgb(0, 9, 8) 51.36542792792793%); bottom: 0px; flex: none; height: var(--framer-aspect-ratio-supported, 271px); left: 50%; overflow: hidden; position: absolute; transform: translateX(-50%); width: 100%; }", ".framer-oYeZ4 .framer-pplf7w { display: grid; flex: none; gap: 8px; grid-auto-rows: min-content; grid-template-columns: repeat(4, minmax(50px, 1fr)); grid-template-rows: repeat(2, min-content); height: min-content; justify-content: center; max-width: 1440px; overflow: hidden; padding: 0px; position: relative; width: 100%; }", ".framer-oYeZ4 .framer-190xuip, .framer-oYeZ4 .framer-103d0zo, .framer-oYeZ4 .framer-1k9wu9x, .framer-oYeZ4 .framer-1r4xugz, .framer-oYeZ4 .framer-148qbkj, .framer-oYeZ4 .framer-ia8fvi, .framer-oYeZ4 .framer-21jw4g, .framer-oYeZ4 .framer-1fvfcop, .framer-oYeZ4 .framer-1oonenc, .framer-oYeZ4 .framer-1sco4en, .framer-oYeZ4 .framer-eq7hne, .framer-oYeZ4 .framer-2umafq, .framer-oYeZ4 .framer-zxxoao, .framer-oYeZ4 .framer-1p7sydq, .framer-oYeZ4 .framer-1p7uw6y, .framer-oYeZ4 .framer-wwkjee, .framer-oYeZ4 .framer-nsiow7, .framer-oYeZ4 .framer-13jwaoh, .framer-oYeZ4 .framer-130s7t9, .framer-oYeZ4 .framer-ea17q7, .framer-oYeZ4 .framer-54luwu, .framer-oYeZ4 .framer-191akss, .framer-oYeZ4 .framer-12kv4eh, .framer-oYeZ4 .framer-129f8nk, .framer-oYeZ4 .framer-1s7c6l7, .framer-oYeZ4 .framer-r4m2zp, .framer-oYeZ4 .framer-1lf6dw4, .framer-oYeZ4 .framer-1hmrkdn, .framer-oYeZ4 .framer-1mb2bh6, .framer-oYeZ4 .framer-1rk3efc, .framer-oYeZ4 .framer-ndwn36 { --border-bottom-width: 1px; --border-color: rgba(150, 252, 229, 0.4); --border-left-width: 1px; --border-right-width: 1px; --border-style: solid; --border-top-width: 1px; align-self: start; aspect-ratio: 1 / 1; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; border-top-left-radius: 8px; border-top-right-radius: 8px; flex: none; height: var(--framer-aspect-ratio-supported, 214px); justify-self: start; overflow: hidden; position: relative; width: 100%; will-change: var(--framer-will-change-override, transform); }", ".framer-oYeZ4 .framer-tx3gtk-container, .framer-oYeZ4 .framer-1ho5t6j-container, .framer-oYeZ4 .framer-12t0qq7-container, .framer-oYeZ4 .framer-fj4g4b-container { flex: none; height: 32px; position: relative; width: 102%; z-index: 0; }", ".framer-oYeZ4 .framer-8abub1 { align-content: center; align-items: center; background-color: #000908; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px; border-top-left-radius: 16px; border-top-right-radius: 16px; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 24px; height: min-content; justify-content: flex-start; overflow: hidden; padding: 24px 16px 40px 16px; position: relative; width: 100%; will-change: var(--framer-will-change-override, transform); }", ".framer-oYeZ4 .framer-10wbps3 { align-content: center; align-items: center; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px; border-top-left-radius: 16px; border-top-right-radius: 16px; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 0px; height: 100%; justify-content: center; left: calc(50.00000000000002% - min(1440px, 100%) / 2); max-width: 1440px; overflow: hidden; padding: 40px; position: absolute; top: calc(54.11184210526317% - 100% / 2); width: 100%; will-change: var(--framer-will-change-override, transform); }", ".framer-oYeZ4 .framer-1nbzzoy { aspect-ratio: 0.6338028169014085 / 1; flex: none; height: 100%; max-width: 928px; overflow: visible; position: relative; width: var(--framer-aspect-ratio-supported, 334px); }", ".framer-oYeZ4 .framer-7fe0hd { -webkit-backdrop-filter: blur(4px); backdrop-filter: blur(4px); background-color: rgba(1, 10, 10, 0.24); bottom: 0px; flex: none; left: -1px; overflow: hidden; position: absolute; right: 0px; top: 0px; z-index: 1; }", ".framer-oYeZ4 .framer-1g4qkoc { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; z-index: 1; }", ".framer-oYeZ4 .framer-1kamh1v { display: grid; flex: none; gap: 8px; grid-auto-rows: minmax(0, 1fr); grid-template-columns: repeat(2, minmax(50px, 1fr)); grid-template-rows: repeat(2, minmax(0, 1fr)); height: min-content; justify-content: center; max-width: 1080px; overflow: hidden; padding: 0px; position: relative; width: 100%; z-index: 1; }", ".framer-oYeZ4 .framer-1cb4ldw, .framer-oYeZ4 .framer-mrnpr4, .framer-oYeZ4 .framer-3tdwh0, .framer-oYeZ4 .framer-12ieuwg, .framer-oYeZ4 .framer-7hlzwf, .framer-oYeZ4 .framer-yid2d0, .framer-oYeZ4 .framer-1hvttoc, .framer-oYeZ4 .framer-jfeb9k, .framer-oYeZ4 .framer-19i2krl, .framer-oYeZ4 .framer-h4f66q, .framer-oYeZ4 .framer-cb4cc3, .framer-oYeZ4 .framer-zeb6h4, .framer-oYeZ4 .framer-1k2s0dk, .framer-oYeZ4 .framer-14aw84q, .framer-oYeZ4 .framer-7u6xt2, .framer-oYeZ4 .framer-44899h, .framer-oYeZ4 .framer-1oyhi9j, .framer-oYeZ4 .framer-1emz4ry, .framer-oYeZ4 .framer-jy2gec, .framer-oYeZ4 .framer-p997jr, .framer-oYeZ4 .framer-14jqv5y, .framer-oYeZ4 .framer-1puhxzl, .framer-oYeZ4 .framer-1ur89l6, .framer-oYeZ4 .framer-1b7fotj, .framer-oYeZ4 .framer-1a6nour, .framer-oYeZ4 .framer-8o0v5y, .framer-oYeZ4 .framer-nwiii0, .framer-oYeZ4 .framer-edyd8a, .framer-oYeZ4 .framer-1felzx1, .framer-oYeZ4 .framer-1lcaeop, .framer-oYeZ4 .framer-u47cg7, .framer-oYeZ4 .framer-1fnuy76, .framer-oYeZ4 .framer-46b0k1, .framer-oYeZ4 .framer-78a030, .framer-oYeZ4 .framer-1fgkigr, .framer-oYeZ4 .framer-iv9mo0 { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; align-self: start; flex: none; height: 100%; justify-self: start; position: relative; white-space: pre; width: fit-content; }", ".framer-oYeZ4 .framer-1n1wnys-container { aspect-ratio: 1 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 880px); max-width: 1080px; position: relative; width: 100%; }", ".framer-oYeZ4 .framer-1mxsdfg, .framer-oYeZ4 .framer-n272j0 { aspect-ratio: 1 / 1; height: var(--framer-aspect-ratio-supported, 1500px); overflow: visible; position: relative; width: 1500px; }", ".framer-oYeZ4 .framer-17lcnj7-container { aspect-ratio: 0.7263922518159807 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 1212px); max-width: 1080px; position: relative; width: 100%; }", ".framer-oYeZ4 .framer-m9ono3 { aspect-ratio: 0.7263922518159807 / 1; height: var(--framer-aspect-ratio-supported, 2065px); overflow: visible; position: relative; width: 1500px; }", ".framer-oYeZ4 .framer-1x7mhmj { aspect-ratio: 0.7264006139677667 / 1; height: var(--framer-aspect-ratio-supported, 2065px); overflow: visible; position: relative; width: 1500px; }", ".framer-oYeZ4 .framer-tgfpuh { align-content: center; align-items: center; background-color: #000908; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px; border-top-left-radius: 16px; border-top-right-radius: 16px; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 24px; height: min-content; justify-content: flex-start; overflow: hidden; padding: 24px 0px 24px 0px; position: relative; width: 100%; will-change: var(--framer-will-change-override, transform); }", ".framer-oYeZ4 .framer-1s6mnv3 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 24px; height: min-content; justify-content: center; max-width: 1440px; overflow: visible; padding: 0px 0px 24px 0px; position: relative; width: 100%; }", ".framer-oYeZ4 .framer-11aekwg, .framer-oYeZ4 .framer-9qd3oo, .framer-oYeZ4 .framer-ntu4to, .framer-oYeZ4 .framer-ikxvyh, .framer-oYeZ4 .framer-4wfxnk { flex: none; height: 38px; overflow: visible; position: relative; width: 100%; }", ".framer-oYeZ4 .framer-1w1xcyu, .framer-oYeZ4 .framer-1tvhrug, .framer-oYeZ4 .framer-psim6d, .framer-oYeZ4 .framer-aqpggg, .framer-oYeZ4 .framer-rvc11k, .framer-oYeZ4 .framer-1p9s8t, .framer-oYeZ4 .framer-19u7hlf, .framer-oYeZ4 .framer-qpu6w9, .framer-oYeZ4 .framer-cp3up4, .framer-oYeZ4 .framer-1o4p4qt, .framer-oYeZ4 .framer-cro38v, .framer-oYeZ4 .framer-16f2dfe { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; left: 50%; position: absolute; top: 0px; transform: translateX(-50%); white-space: pre; width: auto; }", '.framer-oYeZ4 .framer-th2yap { -webkit-filter: blur(4px); background: radial-gradient(50% 50% at 50% 50%, var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, #96fce5) /* {"name":"Primary"} */ 0%, rgba(150, 252, 229, 0) 100%); bottom: -1px; filter: blur(4px); flex: none; height: 16px; left: calc(50.00000000000002% - 100% / 2); overflow: visible; position: absolute; width: 100%; }', ".framer-oYeZ4 .framer-5bfha1, .framer-oYeZ4 .framer-kevebf, .framer-oYeZ4 .framer-dcql47, .framer-oYeZ4 .framer-4jcmui, .framer-oYeZ4 .framer-1yf6nuh, .framer-oYeZ4 .framer-a53jz2, .framer-oYeZ4 .framer-s5q7o5, .framer-oYeZ4 .framer-z87cn4, .framer-oYeZ4 .framer-n31afk, .framer-oYeZ4 .framer-jdhj9, .framer-oYeZ4 .framer-sbnebz, .framer-oYeZ4 .framer-1a2ln7l, .framer-oYeZ4 .framer-1xzbrqc { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; bottom: 0px; flex: none; height: auto; left: 50%; position: absolute; transform: translateX(-50%); white-space: pre; width: auto; }", '.framer-oYeZ4 .framer-uw3wn5, .framer-oYeZ4 .framer-160nrzm { -webkit-filter: blur(8px); background: radial-gradient(50% 50% at 50% 50%, var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, #96fce5) /* {"name":"Primary"} */ 0%, rgba(150, 252, 229, 0) 100%); bottom: 0px; filter: blur(8px); flex: none; height: 16px; left: calc(50.00000000000002% - 90% / 2); overflow: visible; position: absolute; width: 90%; }', ".framer-oYeZ4 .framer-1l41sf0, .framer-oYeZ4 .framer-1u6vwui, .framer-oYeZ4 .framer-kzkboa, .framer-oYeZ4 .framer-1d1prco, .framer-oYeZ4 .framer-g82w2b, .framer-oYeZ4 .framer-13h9jg, .framer-oYeZ4 .framer-1mbjgn3, .framer-oYeZ4 .framer-oxtvdc { flex: none; height: 39px; overflow: visible; position: relative; width: 100%; }", '.framer-oYeZ4 .framer-q25hmt { -webkit-filter: blur(8px); background: radial-gradient(50% 50% at 50% 50%, var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, #96fce5) /* {"name":"Primary"} */ 0%, rgba(150, 252, 229, 0) 100%); bottom: 0px; filter: blur(8px); flex: none; height: 16px; left: calc(50.00000000000002% - 70% / 2); overflow: visible; position: absolute; width: 70%; }', '.framer-oYeZ4 .framer-1aas75l, .framer-oYeZ4 .framer-1xsr9qu, .framer-oYeZ4 .framer-1llnngt { -webkit-filter: blur(8px); background: radial-gradient(50% 50% at 50% 50%, var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, #96fce5) /* {"name":"Primary"} */ 0%, rgba(150, 252, 229, 0) 100%); bottom: 0px; filter: blur(8px); flex: none; height: 16px; left: calc(50.00000000000002% - 60% / 2); overflow: visible; position: absolute; width: 60%; }', '.framer-oYeZ4 .framer-ebykwv { -webkit-filter: blur(8px); background: radial-gradient(50% 50% at 50% 50%, var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, #96fce5) /* {"name":"Primary"} */ 0%, rgba(150, 252, 229, 0) 100%); bottom: 0px; filter: blur(8px); flex: none; height: 16px; left: calc(50.00000000000002% - 50% / 2); overflow: visible; position: absolute; width: 50%; }', ".framer-oYeZ4 .framer-1reprgt { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; left: 50%; position: absolute; top: 1px; transform: translateX(-50%); white-space: pre; width: auto; }", '.framer-oYeZ4 .framer-sq6q52, .framer-oYeZ4 .framer-sk23ss { -webkit-filter: blur(8px); background: radial-gradient(50% 50% at 50% 50%, var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, #96fce5) /* {"name":"Primary"} */ 0%, rgba(150, 252, 229, 0) 100%); bottom: 0px; filter: blur(8px); flex: none; height: 16px; left: calc(50.00000000000002% - 40% / 2); overflow: visible; position: absolute; width: 40%; }', '.framer-oYeZ4 .framer-1yq6bho { -webkit-filter: blur(8px); background: radial-gradient(50% 50% at 50% 50%, var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, #96fce5) /* {"name":"Primary"} */ 0%, rgba(150, 252, 229, 0) 100%); bottom: 0px; filter: blur(8px); flex: none; height: 16px; left: calc(50.00000000000002% - 20% / 2); overflow: visible; position: absolute; width: 20%; }', '.framer-oYeZ4 .framer-dbsyy7 { -webkit-filter: blur(8px); background: radial-gradient(50% 50% at 50% 50%, var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, #96fce5) /* {"name":"Primary"} */ 0%, rgba(150, 252, 229, 0) 100%); bottom: 0px; filter: blur(8px); flex: none; height: 16px; left: calc(50.00000000000002% - 10% / 2); overflow: visible; position: absolute; width: 10%; }', '.framer-oYeZ4 .framer-19qld7p { -webkit-filter: blur(8px); background: radial-gradient(50% 50% at 50% 50%, var(--token-a9e6e11e-d757-45c2-b481-af288c29b3ca, #96fce5) /* {"name":"Primary"} */ 0%, rgba(150, 252, 229, 0) 100%); bottom: 0px; filter: blur(8px); flex: none; height: 16px; left: calc(50.00000000000002% - 4% / 2); overflow: visible; position: absolute; width: 4%; }', ".framer-oYeZ4 .framer-z8qu71 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 8px; height: min-content; justify-content: center; overflow: hidden; padding: 8px; position: relative; width: 100%; z-index: 1; }", "@supports (background: -webkit-named-image(i)) and (not (scale:1)) { .framer-oYeZ4.framer-xfymdx, .framer-oYeZ4 .framer-1q844k3, .framer-oYeZ4 .framer-1g86c5c, .framer-oYeZ4 .framer-12yndkz, .framer-oYeZ4 .framer-x4w8uy, .framer-oYeZ4 .framer-iuu62y, .framer-oYeZ4 .framer-xg4obx, .framer-oYeZ4 .framer-19o8mp9, .framer-oYeZ4 .framer-1i8jm4o, .framer-oYeZ4 .framer-8abub1, .framer-oYeZ4 .framer-10wbps3, .framer-oYeZ4 .framer-1ua657i, .framer-oYeZ4 .framer-1vyi2l6, .framer-oYeZ4 .framer-tgfpuh, .framer-oYeZ4 .framer-1s6mnv3, .framer-oYeZ4 .framer-z8qu71 { gap: 0px; } .framer-oYeZ4.framer-xfymdx > * { margin: 0px; margin-bottom: calc(16px / 2); margin-top: calc(16px / 2); } .framer-oYeZ4.framer-xfymdx > :first-child, .framer-oYeZ4 .framer-1g86c5c > :first-child, .framer-oYeZ4 .framer-x4w8uy > :first-child, .framer-oYeZ4 .framer-iuu62y > :first-child, .framer-oYeZ4 .framer-1i8jm4o > :first-child, .framer-oYeZ4 .framer-8abub1 > :first-child, .framer-oYeZ4 .framer-1ua657i > :first-child, .framer-oYeZ4 .framer-1vyi2l6 > :first-child, .framer-oYeZ4 .framer-tgfpuh > :first-child, .framer-oYeZ4 .framer-1s6mnv3 > :first-child { margin-top: 0px; } .framer-oYeZ4.framer-xfymdx > :last-child, .framer-oYeZ4 .framer-1g86c5c > :last-child, .framer-oYeZ4 .framer-x4w8uy > :last-child, .framer-oYeZ4 .framer-iuu62y > :last-child, .framer-oYeZ4 .framer-1i8jm4o > :last-child, .framer-oYeZ4 .framer-8abub1 > :last-child, .framer-oYeZ4 .framer-1ua657i > :last-child, .framer-oYeZ4 .framer-1vyi2l6 > :last-child, .framer-oYeZ4 .framer-tgfpuh > :last-child, .framer-oYeZ4 .framer-1s6mnv3 > :last-child { margin-bottom: 0px; } .framer-oYeZ4 .framer-1q844k3 > * { margin: 0px; margin-left: calc(12px / 2); margin-right: calc(12px / 2); } .framer-oYeZ4 .framer-1q844k3 > :first-child, .framer-oYeZ4 .framer-12yndkz > :first-child, .framer-oYeZ4 .framer-xg4obx > :first-child, .framer-oYeZ4 .framer-19o8mp9 > :first-child, .framer-oYeZ4 .framer-10wbps3 > :first-child, .framer-oYeZ4 .framer-z8qu71 > :first-child { margin-left: 0px; } .framer-oYeZ4 .framer-1q844k3 > :last-child, .framer-oYeZ4 .framer-12yndkz > :last-child, .framer-oYeZ4 .framer-xg4obx > :last-child, .framer-oYeZ4 .framer-19o8mp9 > :last-child, .framer-oYeZ4 .framer-10wbps3 > :last-child, .framer-oYeZ4 .framer-z8qu71 > :last-child { margin-right: 0px; } .framer-oYeZ4 .framer-1g86c5c > *, .framer-oYeZ4 .framer-x4w8uy > *, .framer-oYeZ4 .framer-iuu62y > *, .framer-oYeZ4 .framer-1i8jm4o > *, .framer-oYeZ4 .framer-8abub1 > *, .framer-oYeZ4 .framer-1ua657i > *, .framer-oYeZ4 .framer-1vyi2l6 > *, .framer-oYeZ4 .framer-tgfpuh > *, .framer-oYeZ4 .framer-1s6mnv3 > * { margin: 0px; margin-bottom: calc(24px / 2); margin-top: calc(24px / 2); } .framer-oYeZ4 .framer-12yndkz > *, .framer-oYeZ4 .framer-19o8mp9 > * { margin: 0px; margin-left: calc(16px / 2); margin-right: calc(16px / 2); } .framer-oYeZ4 .framer-xg4obx > * { margin: 0px; margin-left: calc(24px / 2); margin-right: calc(24px / 2); } .framer-oYeZ4 .framer-10wbps3 > * { margin: 0px; margin-left: calc(0px / 2); margin-right: calc(0px / 2); } .framer-oYeZ4 .framer-z8qu71 > * { margin: 0px; margin-left: calc(8px / 2); margin-right: calc(8px / 2); } }", `@media (min-width: 560px) and (max-width: 959px) { .${Ut.bodyClassName}-framer-oYeZ4 { background: rgb(9, 39, 34); } .framer-oYeZ4.framer-xfymdx { gap: 12px; padding: 12px; width: 560px; } .framer-oYeZ4 .framer-1q844k3 { gap: 10px; } .framer-oYeZ4 .framer-1x6lpdb-container { height: var(--framer-aspect-ratio-supported, 40px); width: 40px; } .framer-oYeZ4 .framer-1g86c5c { padding: 24px; } .framer-oYeZ4 .framer-1uo980v-container { height: var(--framer-aspect-ratio-supported, 643px); } .framer-oYeZ4 .framer-pe4600 { height: var(--framer-aspect-ratio-supported, 800px); } .framer-oYeZ4 .framer-1c3bapr-container { top: 32px; } .framer-oYeZ4 .framer-1e6yavm-container { height: var(--framer-aspect-ratio-supported, 460px); } .framer-oYeZ4 .framer-1kimt19 { height: 240px; } .framer-oYeZ4 .framer-xg4obx { gap: 20px; } .framer-oYeZ4 .framer-4t3k3r, .framer-oYeZ4 .framer-138qsgj, .framer-oYeZ4 .framer-zcf0v0, .framer-oYeZ4 .framer-1jttqog, .framer-oYeZ4 .framer-1j0df96 { height: var(--framer-aspect-ratio-supported, 48px); width: 48px; } .framer-oYeZ4 .framer-1n2tijk { height: var(--framer-aspect-ratio-supported, 71px); } .framer-oYeZ4 .framer-1txjzfy-container, .framer-oYeZ4 .framer-1cw92j6-container { bottom: -2px; top: -2px; } .framer-oYeZ4 .framer-5sp023 { height: 48px; left: calc(50.00000000000002% - 41px / 2); top: calc(50.00000000000002% - 48px / 2); width: 41px; } .framer-oYeZ4 .framer-1i8jm4o, .framer-oYeZ4 .framer-1ua657i, .framer-oYeZ4 .framer-1vyi2l6, .framer-oYeZ4 .framer-tgfpuh { padding: 24px 16px 16px 16px; } .framer-oYeZ4 .framer-dn9trr { height: var(--framer-aspect-ratio-supported, 252px); } .framer-oYeZ4 .framer-10kogrx { height: var(--framer-aspect-ratio-supported, 480px); top: -24px; width: 156%; } .framer-oYeZ4 .framer-1oi1wyi { height: var(--framer-aspect-ratio-supported, 170px); } .framer-oYeZ4 .framer-pplf7w { grid-template-columns: repeat(3, minmax(50px, 1fr)); } .framer-oYeZ4 .framer-190xuip, .framer-oYeZ4 .framer-103d0zo, .framer-oYeZ4 .framer-1k9wu9x, .framer-oYeZ4 .framer-1r4xugz, .framer-oYeZ4 .framer-148qbkj, .framer-oYeZ4 .framer-ia8fvi, .framer-oYeZ4 .framer-1sco4en, .framer-oYeZ4 .framer-eq7hne, .framer-oYeZ4 .framer-2umafq, .framer-oYeZ4 .framer-zxxoao, .framer-oYeZ4 .framer-1p7sydq, .framer-oYeZ4 .framer-1p7uw6y, .framer-oYeZ4 .framer-130s7t9, .framer-oYeZ4 .framer-ea17q7, .framer-oYeZ4 .framer-54luwu, .framer-oYeZ4 .framer-191akss, .framer-oYeZ4 .framer-12kv4eh, .framer-oYeZ4 .framer-129f8nk, .framer-oYeZ4 .framer-1hmrkdn, .framer-oYeZ4 .framer-1mb2bh6, .framer-oYeZ4 .framer-1rk3efc, .framer-oYeZ4 .framer-ndwn36 { height: var(--framer-aspect-ratio-supported, 163px); } .framer-oYeZ4 .framer-21jw4g, .framer-oYeZ4 .framer-1fvfcop, .framer-oYeZ4 .framer-1oonenc, .framer-oYeZ4 .framer-wwkjee, .framer-oYeZ4 .framer-nsiow7, .framer-oYeZ4 .framer-13jwaoh, .framer-oYeZ4 .framer-1s7c6l7, .framer-oYeZ4 .framer-r4m2zp, .framer-oYeZ4 .framer-1lf6dw4 { height: var(--framer-aspect-ratio-supported, 162px); } .framer-oYeZ4 .framer-8abub1 { padding: 24px 16px 32px 16px; } .framer-oYeZ4 .framer-1nbzzoy { width: var(--framer-aspect-ratio-supported, 588px); } .framer-oYeZ4 .framer-1kamh1v { align-content: center; align-items: center; display: flex; flex-direction: column; flex-wrap: nowrap; } .framer-oYeZ4 .framer-1cb4ldw, .framer-oYeZ4 .framer-mrnpr4, .framer-oYeZ4 .framer-3tdwh0, .framer-oYeZ4 .framer-12ieuwg, .framer-oYeZ4 .framer-7hlzwf, .framer-oYeZ4 .framer-yid2d0, .framer-oYeZ4 .framer-1hvttoc, .framer-oYeZ4 .framer-jfeb9k, .framer-oYeZ4 .framer-19i2krl, .framer-oYeZ4 .framer-h4f66q, .framer-oYeZ4 .framer-cb4cc3, .framer-oYeZ4 .framer-zeb6h4, .framer-oYeZ4 .framer-1k2s0dk, .framer-oYeZ4 .framer-14aw84q, .framer-oYeZ4 .framer-7u6xt2, .framer-oYeZ4 .framer-44899h, .framer-oYeZ4 .framer-1oyhi9j, .framer-oYeZ4 .framer-1emz4ry, .framer-oYeZ4 .framer-jy2gec, .framer-oYeZ4 .framer-p997jr, .framer-oYeZ4 .framer-14jqv5y, .framer-oYeZ4 .framer-1puhxzl, .framer-oYeZ4 .framer-1ur89l6, .framer-oYeZ4 .framer-1b7fotj, .framer-oYeZ4 .framer-1a6nour, .framer-oYeZ4 .framer-8o0v5y, .framer-oYeZ4 .framer-nwiii0, .framer-oYeZ4 .framer-edyd8a, .framer-oYeZ4 .framer-1felzx1, .framer-oYeZ4 .framer-1lcaeop, .framer-oYeZ4 .framer-u47cg7, .framer-oYeZ4 .framer-1fnuy76, .framer-oYeZ4 .framer-46b0k1, .framer-oYeZ4 .framer-78a030, .framer-oYeZ4 .framer-1fgkigr, .framer-oYeZ4 .framer-iv9mo0 { align-self: unset; height: auto; width: auto; } .framer-oYeZ4 .framer-1n1wnys-container { height: var(--framer-aspect-ratio-supported, 504px); } .framer-oYeZ4 .framer-17lcnj7-container { height: var(--framer-aspect-ratio-supported, 694px); } @supports (background: -webkit-named-image(i)) and (not (scale:1)) { .framer-oYeZ4.framer-xfymdx, .framer-oYeZ4 .framer-1q844k3, .framer-oYeZ4 .framer-xg4obx, .framer-oYeZ4 .framer-1kamh1v { gap: 0px; } .framer-oYeZ4.framer-xfymdx > * { margin: 0px; margin-bottom: calc(12px / 2); margin-top: calc(12px / 2); } .framer-oYeZ4.framer-xfymdx > :first-child, .framer-oYeZ4 .framer-1kamh1v > :first-child { margin-top: 0px; } .framer-oYeZ4.framer-xfymdx > :last-child, .framer-oYeZ4 .framer-1kamh1v > :last-child { margin-bottom: 0px; } .framer-oYeZ4 .framer-1q844k3 > * { margin: 0px; margin-left: calc(10px / 2); margin-right: calc(10px / 2); } .framer-oYeZ4 .framer-1q844k3 > :first-child, .framer-oYeZ4 .framer-xg4obx > :first-child { margin-left: 0px; } .framer-oYeZ4 .framer-1q844k3 > :last-child, .framer-oYeZ4 .framer-xg4obx > :last-child { margin-right: 0px; } .framer-oYeZ4 .framer-xg4obx > * { margin: 0px; margin-left: calc(20px / 2); margin-right: calc(20px / 2); } .framer-oYeZ4 .framer-1kamh1v > * { margin: 0px; margin-bottom: calc(8px / 2); margin-top: calc(8px / 2); } }}`, `@media (max-width: 559px) { .${Ut.bodyClassName}-framer-oYeZ4 { background: rgb(9, 39, 34); } .framer-oYeZ4.framer-xfymdx { gap: 8px; padding: 8px; width: 390px; } .framer-oYeZ4 .framer-1q844k3 { gap: 8px; } .framer-oYeZ4 .framer-1x6lpdb-container { height: var(--framer-aspect-ratio-supported, 32px); width: 32px; } .framer-oYeZ4 .framer-1g86c5c { padding: 16px; } .framer-oYeZ4 .framer-1uo980v-container { height: var(--framer-aspect-ratio-supported, 449px); } .framer-oYeZ4 .framer-pe4600 { height: var(--framer-aspect-ratio-supported, 800px); } .framer-oYeZ4 .framer-1c3bapr-container { top: 24px; } .framer-oYeZ4 .framer-1e6yavm-container { height: var(--framer-aspect-ratio-supported, 453px); } .framer-oYeZ4 .framer-1kimt19 { height: 240px; } .framer-oYeZ4 .framer-x4w8uy, .framer-oYeZ4 .framer-iuu62y { padding: 8px; } .framer-oYeZ4 .framer-phz79i, .framer-oYeZ4 .framer-3jmomq, .framer-oYeZ4 .framer-1g4qkoc, .framer-oYeZ4 .framer-1goz4rd, .framer-oYeZ4 .framer-lobd7u { order: 0; } .framer-oYeZ4 .framer-xg4obx { gap: 16px; } .framer-oYeZ4 .framer-4t3k3r, .framer-oYeZ4 .framer-138qsgj, .framer-oYeZ4 .framer-zcf0v0, .framer-oYeZ4 .framer-1jttqog, .framer-oYeZ4 .framer-1j0df96 { height: var(--framer-aspect-ratio-supported, 36px); width: 36px; } .framer-oYeZ4 .framer-1n2tijk { height: var(--framer-aspect-ratio-supported, 53px); } .framer-oYeZ4 .framer-5sp023 { height: 36px; left: calc(50.00000000000002% - 30px / 2); top: calc(50.00000000000002% - 36px / 2); width: 30px; } .framer-oYeZ4 .framer-1i8jm4o, .framer-oYeZ4 .framer-1ua657i, .framer-oYeZ4 .framer-1vyi2l6, .framer-oYeZ4 .framer-tgfpuh { gap: 16px; padding: 16px 8px 8px 8px; } .framer-oYeZ4 .framer-dn9trr { height: var(--framer-aspect-ratio-supported, 179px); order: 1; } .framer-oYeZ4 .framer-10kogrx { height: var(--framer-aspect-ratio-supported, 360px); order: 2; top: -16px; width: 168%; } .framer-oYeZ4 .framer-1oi1wyi { height: var(--framer-aspect-ratio-supported, 128px); } .framer-oYeZ4 .framer-pplf7w { grid-template-columns: repeat(2, minmax(50px, 1fr)); order: 3; } .framer-oYeZ4 .framer-190xuip, .framer-oYeZ4 .framer-103d0zo, .framer-oYeZ4 .framer-1k9wu9x, .framer-oYeZ4 .framer-1r4xugz, .framer-oYeZ4 .framer-148qbkj, .framer-oYeZ4 .framer-ia8fvi, .framer-oYeZ4 .framer-21jw4g, .framer-oYeZ4 .framer-1fvfcop, .framer-oYeZ4 .framer-1oonenc, .framer-oYeZ4 .framer-1sco4en, .framer-oYeZ4 .framer-eq7hne, .framer-oYeZ4 .framer-2umafq, .framer-oYeZ4 .framer-zxxoao, .framer-oYeZ4 .framer-1p7sydq, .framer-oYeZ4 .framer-1p7uw6y, .framer-oYeZ4 .framer-wwkjee, .framer-oYeZ4 .framer-nsiow7, .framer-oYeZ4 .framer-13jwaoh, .framer-oYeZ4 .framer-130s7t9, .framer-oYeZ4 .framer-ea17q7, .framer-oYeZ4 .framer-54luwu, .framer-oYeZ4 .framer-191akss, .framer-oYeZ4 .framer-12kv4eh, .framer-oYeZ4 .framer-129f8nk, .framer-oYeZ4 .framer-1s7c6l7, .framer-oYeZ4 .framer-r4m2zp, .framer-oYeZ4 .framer-1lf6dw4, .framer-oYeZ4 .framer-1hmrkdn, .framer-oYeZ4 .framer-1mb2bh6, .framer-oYeZ4 .framer-1rk3efc, .framer-oYeZ4 .framer-ndwn36 { height: var(--framer-aspect-ratio-supported, 175px); } .framer-oYeZ4 .framer-8abub1 { gap: 16px; padding: 16px 8px 24px 8px; } .framer-oYeZ4 .framer-10wbps3 { order: 1; } .framer-oYeZ4 .framer-1nbzzoy { width: var(--framer-aspect-ratio-supported, 508px); } .framer-oYeZ4 .framer-1kamh1v { align-content: center; align-items: center; display: flex; flex-direction: column; flex-wrap: nowrap; order: 2; } .framer-oYeZ4 .framer-1cb4ldw, .framer-oYeZ4 .framer-mrnpr4, .framer-oYeZ4 .framer-3tdwh0, .framer-oYeZ4 .framer-12ieuwg, .framer-oYeZ4 .framer-7hlzwf, .framer-oYeZ4 .framer-yid2d0, .framer-oYeZ4 .framer-1hvttoc, .framer-oYeZ4 .framer-jfeb9k, .framer-oYeZ4 .framer-19i2krl, .framer-oYeZ4 .framer-h4f66q, .framer-oYeZ4 .framer-cb4cc3, .framer-oYeZ4 .framer-zeb6h4, .framer-oYeZ4 .framer-1k2s0dk, .framer-oYeZ4 .framer-14aw84q, .framer-oYeZ4 .framer-7u6xt2, .framer-oYeZ4 .framer-44899h, .framer-oYeZ4 .framer-1oyhi9j, .framer-oYeZ4 .framer-1emz4ry, .framer-oYeZ4 .framer-jy2gec, .framer-oYeZ4 .framer-p997jr, .framer-oYeZ4 .framer-14jqv5y, .framer-oYeZ4 .framer-1puhxzl, .framer-oYeZ4 .framer-1ur89l6, .framer-oYeZ4 .framer-1b7fotj, .framer-oYeZ4 .framer-1a6nour, .framer-oYeZ4 .framer-8o0v5y, .framer-oYeZ4 .framer-nwiii0, .framer-oYeZ4 .framer-edyd8a, .framer-oYeZ4 .framer-1felzx1, .framer-oYeZ4 .framer-1lcaeop, .framer-oYeZ4 .framer-u47cg7, .framer-oYeZ4 .framer-1fnuy76, .framer-oYeZ4 .framer-46b0k1, .framer-oYeZ4 .framer-78a030, .framer-oYeZ4 .framer-1fgkigr, .framer-oYeZ4 .framer-iv9mo0 { align-self: unset; height: auto; width: auto; } .framer-oYeZ4 .framer-1n1wnys-container { height: var(--framer-aspect-ratio-supported, 358px); order: 1; } .framer-oYeZ4 .framer-17lcnj7-container { height: var(--framer-aspect-ratio-supported, 493px); order: 1; } @supports (background: -webkit-named-image(i)) and (not (scale:1)) { .framer-oYeZ4.framer-xfymdx, .framer-oYeZ4 .framer-1q844k3, .framer-oYeZ4 .framer-xg4obx, .framer-oYeZ4 .framer-1i8jm4o, .framer-oYeZ4 .framer-8abub1, .framer-oYeZ4 .framer-1kamh1v, .framer-oYeZ4 .framer-1ua657i, .framer-oYeZ4 .framer-1vyi2l6, .framer-oYeZ4 .framer-tgfpuh { gap: 0px; } .framer-oYeZ4.framer-xfymdx > *, .framer-oYeZ4 .framer-1kamh1v > * { margin: 0px; margin-bottom: calc(8px / 2); margin-top: calc(8px / 2); } .framer-oYeZ4.framer-xfymdx > :first-child, .framer-oYeZ4 .framer-1i8jm4o > :first-child, .framer-oYeZ4 .framer-8abub1 > :first-child, .framer-oYeZ4 .framer-1kamh1v > :first-child, .framer-oYeZ4 .framer-1ua657i > :first-child, .framer-oYeZ4 .framer-1vyi2l6 > :first-child, .framer-oYeZ4 .framer-tgfpuh > :first-child { margin-top: 0px; } .framer-oYeZ4.framer-xfymdx > :last-child, .framer-oYeZ4 .framer-1i8jm4o > :last-child, .framer-oYeZ4 .framer-8abub1 > :last-child, .framer-oYeZ4 .framer-1kamh1v > :last-child, .framer-oYeZ4 .framer-1ua657i > :last-child, .framer-oYeZ4 .framer-1vyi2l6 > :last-child, .framer-oYeZ4 .framer-tgfpuh > :last-child { margin-bottom: 0px; } .framer-oYeZ4 .framer-1q844k3 > * { margin: 0px; margin-left: calc(8px / 2); margin-right: calc(8px / 2); } .framer-oYeZ4 .framer-1q844k3 > :first-child, .framer-oYeZ4 .framer-xg4obx > :first-child { margin-left: 0px; } .framer-oYeZ4 .framer-1q844k3 > :last-child, .framer-oYeZ4 .framer-xg4obx > :last-child { margin-right: 0px; } .framer-oYeZ4 .framer-xg4obx > * { margin: 0px; margin-left: calc(16px / 2); margin-right: calc(16px / 2); } .framer-oYeZ4 .framer-1i8jm4o > *, .framer-oYeZ4 .framer-8abub1 > *, .framer-oYeZ4 .framer-1ua657i > *, .framer-oYeZ4 .framer-1vyi2l6 > *, .framer-oYeZ4 .framer-tgfpuh > * { margin: 0px; margin-bottom: calc(16px / 2); margin-top: calc(16px / 2); } }}`, '.framer-oYeZ4[data-border="true"]::after, .framer-oYeZ4 [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }']
  , st = Je(Io, Eo, "framer-oYeZ4")
  , Gc = st;
st.displayName = "Home";
st.defaultProps = {
    height: 8311,
    width: 960
};
Ge(st, [{
    explicitInter: !0,
    fonts: [{
        family: "Orbitron",
        source: "google",
        style: "normal",
        url: "https://fonts.gstatic.com/s/orbitron/v31/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyGy6xo2IyXjU1pg.woff2",
        weight: "400"
    }, {
        family: "Orbitron",
        source: "google",
        style: "normal",
        url: "https://fonts.gstatic.com/s/orbitron/v31/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1ny_Cmxo2IyXjU1pg.woff2",
        weight: "700"
    }, {
        family: "Orbitron",
        source: "google",
        style: "normal",
        url: "https://fonts.gstatic.com/s/orbitron/v31/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyKS6xo2IyXjU1pg.woff2",
        weight: "500"
    }, {
        family: "Montserrat",
        source: "fontshare",
        style: "normal",
        url: "./framerusercontent.com/third-party-assets/fontshare/wf/G3U4AIP7I5YYMBY4PZ5BNYEWWVH7G7QB/WED2HATCWTE6B4XVIFFTI3EALCE4D6PD/GDZ4LVIJF6WODYKVZK6E2737DCDQPEMZ.woff2",
        weight: "500"
    }, {
        family: "Montserrat",
        source: "fontshare",
        style: "italic",
        url: "./framerusercontent.com/third-party-assets/fontshare/wf/CC6FT7O535LIU5P34T6V2W7R57LGKSDT/KUZZS4REMM64PV6S4GGM77HZQUVJPYU2/3ZPIFBJ6EZFOZSYT4ISIO7DHQQODA5IR.woff2",
        weight: "400"
    }]
}, ...mo, ...co, ...fo, ...po, ...ho, ...go], {
    supportsExplicitInterCodegen: !0
});
var Qc = {
    exports: {
        Props: {
            type: "tsType",
            annotations: {
                framerContractVersion: "1"
            }
        },
        default: {
            type: "reactComponent",
            name: "FramerA32Iiwo2G",
            slots: [],
            annotations: {
                framerImmutableVariables: "true",
                framerIntrinsicWidth: "960",
                framerResponsiveScreen: "",
                framerIntrinsicHeight: "8311",
                framerContractVersion: "1",
                framerCanvasComponentVariantDetails: '{"propertyName":"variant","data":{"default":{"layout":["fixed","auto"]},"BE_1LvUPA":{"layout":["fixed","auto"]},"tbgdi9qHR":{"layout":["fixed","auto"]}}}',
                framerDisplayContentsDiv: "false",
                framerComponentViewportWidth: "true"
            }
        },
        __FramerMetadata__: {
            type: "variable"
        }
    }
};
export {Qc as __FramerMetadata__, Gc as default};
//# sourceMappingURL=DCzeDAzvsnkIWrwrE5iPbXUSXrSfHjcBzgsZcEDJsA8.IN33PRLC.mjs.map
