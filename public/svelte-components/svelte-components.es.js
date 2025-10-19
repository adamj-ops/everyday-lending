typeof window < 'u' && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add('5');
const ps = 1; const ys = 2; const _s = 16; const gs = 1; const ms = 4; const bs = 8; const ws = 16; const Es = 1; const $s = 2; const en = '['; const Fe = '[!'; const pr = ']'; const Vt = {}; const I = Symbol(); const rn = !1;
const Ae = Array.isArray; const xs = Array.prototype.indexOf; const yr = Array.from; const be = Object.keys; const Dt = Object.defineProperty; const At = Object.getOwnPropertyDescriptor; const Os = Object.prototype; const Ss = Array.prototype; const Cs = Object.getPrototypeOf; const Mr = Object.isExtensible;
const we = () => {
};
function Rs(t) {
  for (let e = 0; e < t.length; e++) {
    t[e]();
  }
}
function nn() {
  let t; let e; const r = new Promise((n, s) => {
    t = n, e = s;
  });
  return { promise: r, resolve: t, reject: e };
}
const L = 2; const _r = 4; const ke = 8; const Nt = 16; const _t = 32; const Ot = 64; const gr = 128; const rt = 256; const Ee = 512; const q = 1024; const W = 2048; const St = 4096; const ot = 8192; const Qt = 16384; const mr = 32768; const le = 65536; const Nr = 1 << 17; const Ps = 1 << 18; const qt = 1 << 19; const sn = 1 << 20; const We = 1 << 21; const br = 1 << 22; const kt = 1 << 23; const ge = Symbol('$state'); const an = Symbol('legacy props'); const Kt = new class extends Error {
  name = 'StaleReactionError';
  message = 'The reaction that called `getAbortSignal()` was re-run or destroyed';
}(); const wr = 3; const Jt = 8;
function De(t) {
  throw new Error('https://svelte.dev/e/lifecycle_outside_component');
}
function Ts() {
  throw new Error('https://svelte.dev/e/async_derived_orphan');
}
function Fs(t) {
  throw new Error('https://svelte.dev/e/effect_in_teardown');
}
function As() {
  throw new Error('https://svelte.dev/e/effect_in_unowned_derived');
}
function ks(t) {
  throw new Error('https://svelte.dev/e/effect_orphan');
}
function Ds() {
  throw new Error('https://svelte.dev/e/effect_update_depth_exceeded');
}
function Is() {
  throw new Error('https://svelte.dev/e/hydration_failed');
}
function Ms(t) {
  throw new Error('https://svelte.dev/e/props_invalid_value');
}
function Ns() {
  throw new Error('https://svelte.dev/e/state_descriptors_fixed');
}
function Qs() {
  throw new Error('https://svelte.dev/e/state_prototype_fixed');
}
function qs() {
  throw new Error('https://svelte.dev/e/state_unsafe_mutation');
}
function Us() {
  throw new Error('https://svelte.dev/e/svelte_boundary_reset_onerror');
}
function Ie(t) {
  console.warn('https://svelte.dev/e/hydration_mismatch');
}
function js() {
  console.warn('https://svelte.dev/e/svelte_boundary_reset_noop');
}
let S = !1;
function it(t) {
  S = t;
}
let $;
function U(t) {
  if (t === null) {
    throw Ie(), Vt;
  }
  return $ = t;
}
function Me() {
  return U(
    /** @type {TemplateNode} */
    /* @__PURE__ */ dt($),
  );
}
function A(t) {
  if (S) {
    if (/* @__PURE__ */ dt($) !== null) {
      throw Ie(), Vt;
    }
    $ = t;
  }
}
function Ls(t = 1) {
  if (S) {
    for (var e = t, r = $; e--;) {
      r /** @type {TemplateNode} */
      /* @__PURE__ */ = dt(r);
    }
    $ = r;
  }
}
function $e(t = !0) {
  for (let e = 0, r = $; ;) {
    if (r.nodeType === Jt) {
      const n = (
        /** @type {Comment} */
        r.data
      );
      if (n === pr) {
        if (e === 0) {
          return r;
        }
        e -= 1;
      } else {
        (n === en || n === Fe) && (e += 1);
      }
    }
    const s = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ dt(r)
    );
    t && r.remove(), r = s;
  }
}
function on(t) {
  if (!t || t.nodeType !== Jt) {
    throw Ie(), Vt;
  }
  return (
    /** @type {Comment} */
    t.data
  );
}
function un(t) {
  return t === this.v;
}
function Ks(t, e) {
  return t != t ? e == e : t !== e || t !== null && typeof t == 'object' || typeof t == 'function';
}
function ln(t) {
  return !Ks(t, this.v);
}
const Hs = !1; let k = null;
function Gt(t) {
  k = t;
}
function cn(t) {
  return (
    /** @type {T} */
    hn().get(t)
  );
}
function Bs(t, e) {
  return hn().set(t, e), e;
}
function Ne(t, e = !1, r) {
  k = {
    p: k,
    c: null,
    e: null,
    s: t,
    x: null,
    l: null,
  };
}
function Qe(t) {
  const e = (
    /** @type {ComponentContext} */
    k
  ); const r = e.e;
  if (r !== null) {
    e.e = null;
    for (const n of r) {
      Fn(n);
    }
  }
  return t !== void 0 && (e.x = t), k = e.p, t /** @type {T} */
    ?? {};
}
function fn() {
  return !0;
}
function hn(t) {
  return k === null && De(), k.c ??= new Map(zs(k) || void 0);
}
function zs(t) {
  let e = t.p;
  for (; e !== null;) {
    const r = e.c;
    if (r !== null) {
      return r;
    }
    e = e.p;
  }
  return null;
}
let Tt = [];
function dn() {
  const t = Tt;
  Tt = [], Rs(t);
}
function xe(t) {
  if (Tt.length === 0 && !ne) {
    const e = Tt;
    queueMicrotask(() => {
      e === Tt && dn();
    });
  }
  Tt.push(t);
}
function Vs() {
  for (; Tt.length > 0;) {
    dn();
  }
}
const Gs = /* @__PURE__ */ new WeakMap();
function vn(t) {
  const e = w;
  if (e === null) {
    return E.f |= kt, t;
  }
  if ((e.f & mr) === 0) {
    if ((e.f & gr) === 0) {
      throw !e.parent && t instanceof Error && pn(t), t;
    }
    e.b.error(t);
  } else {
    Yt(t, e);
  }
}
function Yt(t, e) {
  for (; e !== null;) {
    if ((e.f & gr) !== 0) {
      try {
        e.b.error(t);
        return;
      } catch (r) {
        t = r;
      }
    }
    e = e.parent;
  }
  throw t instanceof Error && pn(t), t;
}
function pn(t) {
  const e = Gs.get(t);
  e && (Dt(t, 'message', {
    value: e.message,
  }), Dt(t, 'stack', {
    value: e.stack,
  }));
}
const ve = /* @__PURE__ */ new Set();
let T = null; let nt = null; const Je = /* @__PURE__ */ new Set(); let ft = []; let qe = null; let Xe = !1; let ne = !1;
class at {
  /**
   * The current values of any sources that are updated in this batch
   * They keys of this map are identical to `this.#previous`
   * @type {Map<Source, any>}
   */
  current = /* @__PURE__ */ new Map();
  /**
   * The values of any sources that are updated in this batch _before_ those updates took place.
   * They keys of this map are identical to `this.#current`
   * @type {Map<Source, any>}
   */
  #e = /* @__PURE__ */ new Map();
  /**
   * When the batch is committed (and the DOM is updated), we need to remove old branches
   * and append new ones by calling the functions added inside (if/each/key/etc) blocks
   * @type {Set<() => void>}
   */
  #t = /* @__PURE__ */ new Set();
  /**
   * The number of async effects that are currently in flight
   */
  #r = 0;
  /**
   * A deferred that resolves when the batch is committed, used with `settled()`
   * TODO replace with Promise.withResolvers once supported widely enough
   * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
   */
  #s = null;
  /**
   * Template effects and `$effect.pre` effects, which run when
   * a batch is committed
   * @type {Effect[]}
   */
  #n = [];
  /**
   * The same as `#render_effects`, but for `$effect` (which runs after)
   * @type {Effect[]}
   */
  #o = [];
  /**
   * Block effects, which may need to re-run on subsequent flushes
   * in order to update internal sources (e.g. each block items)
   * @type {Effect[]}
   */
  #a = [];
  /**
   * Deferred effects (which run after async work has completed) that are DIRTY
   * @type {Effect[]}
   */
  #i = [];
  /**
   * Deferred effects that are MAYBE_DIRTY
   * @type {Effect[]}
   */
  #u = [];
  /**
   * A set of branches that still exist, but will be destroyed when this batch
   * is committed — we skip over these during `process`
   * @type {Set<Effect>}
   */
  skipped_effects = /* @__PURE__ */ new Set();
  /**
   *
   * @param {Effect[]} root_effects
   */
  process(e) {
    ft = [], this.apply();
    for (const i of e) {
      this.#c(i);
    }
    if (this.#r === 0) {
      const r = nt;
      this.#l();
      const n = this.#n; const s = this.#o;
      this.#n = [], this.#o = [], this.#a = [], T = null, nt = r, Qr(n), Qr(s), this.#s?.resolve();
    } else {
      this.#f(this.#n), this.#f(this.#o), this.#f(this.#a);
    }
    nt = null;
  }

  /**
   * Traverse the effect tree, executing effects or stashing
   * them for later execution as appropriate
   * @param {Effect} root
   */
  #c(e) {
    e.f ^= q;
    for (let r = e.first; r !== null;) {
      const n = r.f; const s = (n & (_t | Ot)) !== 0; const i = s && (n & q) !== 0; const a = i || (n & ot) !== 0 || this.skipped_effects.has(r);
      if (!a && r.fn !== null) {
        s ? r.f ^= q : (n & _r) !== 0 ? this.#o.push(r) : Le(r) && ((r.f & Nt) !== 0 && this.#a.push(r), Se(r));
        const o = r.first;
        if (o !== null) {
          r = o;
          continue;
        }
      }
      let u = r.parent;
      for (r = r.next; r === null && u !== null;) {
        r = u.next, u = u.parent;
      }
    }
  }

  /**
   * @param {Effect[]} effects
   */
  #f(e) {
    for (const r of e) {
      ((r.f & W) !== 0 ? this.#i : this.#u).push(r), j(r, q);
    }
    e.length = 0;
  }

  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(e, r) {
    this.#e.has(e) || this.#e.set(e, r), this.current.set(e, e.v), nt?.set(e, e.v);
  }

  activate() {
    T = this;
  }

  deactivate() {
    T = null, nt = null;
  }

  flush() {
    if (ft.length > 0) {
      if (this.activate(), yn(), T !== null && T !== this) {
        return;
      }
    } else {
      this.#r === 0 && this.#l();
    }
    this.deactivate();
    for (const e of Je) {
      if (Je.delete(e), e(), T !== null) {
        break;
      }
    }
  }

  /**
   * Append and remove branches to/from the DOM
   */
  #l() {
    for (const e of this.#t) {
      e();
    }
    if (this.#t.clear(), ve.size > 1) {
      this.#e.clear();
      let e = !0;
      for (const r of ve) {
        if (r === this) {
          e = !1;
          continue;
        }
        const n = [];
        for (const [i, a] of this.current) {
          if (r.current.has(i)) {
            if (e && a !== r.current.get(i)) {
              r.current.set(i, a);
            } else {
              continue;
            }
          }
          n.push(i);
        }
        if (n.length === 0) {
          continue;
        }
        const s = [...r.current.keys()].filter(i => !this.current.has(i));
        if (s.length > 0) {
          for (const i of n) {
            _n(i, s);
          }
          if (ft.length > 0) {
            T = r, r.apply();
            for (const i of ft) {
              r.#c(i);
            }
            ft = [], r.deactivate();
          }
        }
      }
      T = null;
    }
    ve.delete(this);
  }

  increment() {
    this.#r += 1;
  }

  decrement() {
    this.#r -= 1;
    for (const e of this.#i) {
      j(e, W), It(e);
    }
    for (const e of this.#u) {
      j(e, St), It(e);
    }
    this.flush();
  }

  /** @param {() => void} fn */
  add_callback(e) {
    this.#t.add(e);
  }

  settled() {
    return (this.#s ??= nn()).promise;
  }

  static ensure() {
    if (T === null) {
      const e = T = new at();
      ve.add(T), ne || at.enqueue(() => {
        T === e && e.flush();
      });
    }
    return T;
  }

  /** @param {() => void} task */
  static enqueue(e) {
    xe(e);
  }

  apply() {
  }
}
function se(t) {
  const e = ne;
  ne = !0;
  try {
    for (var r; ;) {
      if (Vs(), ft.length === 0 && (T?.flush(), ft.length === 0)) {
        return qe = null, /** @type {T} */
        r;
      }
      yn();
    }
  } finally {
    ne = e;
  }
}
function yn() {
  const t = Bt;
  Xe = !0;
  try {
    let e = 0;
    for (jr(!0); ft.length > 0;) {
      const r = at.ensure();
      if (e++ > 1e3) {
        var n, s;
        Ys();
      }
      r.process(ft), wt.clear();
    }
  } finally {
    Xe = !1, jr(t), qe = null;
  }
}
function Ys() {
  try {
    Ds();
  } catch (t) {
    Yt(t, qe);
  }
}
let Pt = null;
function Qr(t) {
  const e = t.length;
  if (e !== 0) {
    for (let r = 0; r < e;) {
      const n = t[r++];
      if ((n.f & (Qt | ot)) === 0 && Le(n) && (Pt = [], Se(n), n.deps === null && n.first === null && n.nodes_start === null && (n.teardown === null && n.ac === null ? In(n) : n.fn = null), Pt?.length > 0)) {
        wt.clear();
        for (const s of Pt) {
          Se(s);
        }
        Pt = [];
      }
    }
    Pt = null;
  }
}
function _n(t, e) {
  if (t.reactions !== null) {
    for (const r of t.reactions) {
      const n = r.f;
      (n & L) !== 0 ? _n(
      /** @type {Derived} */
        r,
        e,
      ) : (n & (br | Nt)) !== 0 && gn(r, e) && (j(r, W), It(
      /** @type {Effect} */
        r,
      ));
    }
  }
}
function gn(t, e) {
  if (t.deps !== null) {
    for (const r of t.deps) {
      if (e.includes(r) || (r.f & L) !== 0 && gn(
      /** @type {Derived} */
        r,
        e,
      )) {
        return !0;
      }
    }
  }
  return !1;
}
function It(t) {
  for (var e = qe = t; e.parent !== null;) {
    e = e.parent;
    const r = e.f;
    if (Xe && e === w && (r & Nt) !== 0) {
      return;
    }
    if ((r & (Ot | _t)) !== 0) {
      if ((r & q) === 0) {
        return;
      }
      e.f ^= q;
    }
  }
  ft.push(e);
}
function Ws(t) {
  let e = 0; const r = xt(0); let n;
  return () => {
    ai() && (_(r), An(() => (e === 0 && (n = Xt(() => t(() => Et(r)))), e += 1, () => {
      xe(() => {
        e -= 1, e === 0 && (n?.(), n = void 0, Et(r));
      });
    })));
  };
}
const Js = le | qt | gr;
function Xs(t, e, r) {
  new Zs(t, e, r);
}
class Zs {
  /** @type {Boundary | null} */
  parent;
  #e = !1;
  /** @type {TemplateNode} */
  #t;
  /** @type {TemplateNode | null} */
  #r = S ? $ : null;
  /** @type {BoundaryProps} */
  #s;
  /** @type {((anchor: Node) => void)} */
  #n;
  /** @type {Effect} */
  #o;
  /** @type {Effect | null} */
  #a = null;
  /** @type {Effect | null} */
  #i = null;
  /** @type {Effect | null} */
  #u = null;
  /** @type {DocumentFragment | null} */
  #c = null;
  #f = 0;
  #l = 0;
  #d = !1;
  /**
   * A source containing the number of pending async deriveds/expressions.
   * Only created if `$effect.pending()` is used inside the boundary,
   * otherwise updating the source results in needless `Batch.ensure()`
   * calls followed by no-op flushes
   * @type {Source<number> | null}
   */
  #h = null;
  #_ = () => {
    this.#h && ie(this.#h, this.#f);
  };

  #v = Ws(() => (this.#h = xt(this.#f), () => {
    this.#h = null;
  }));

  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   */
  constructor(e, r, n) {
    this.#t = e, this.#s = r, this.#n = n, this.parent /** @type {Effect} */
      = w.b, this.#e = !!this.#s.pending, this.#o = je(() => {
      if (w.b = this, S) {
        const s = this.#r;
        Me(), /** @type {Comment} */
        s.nodeType === Jt /** @type {Comment} */
        && s.data === Fe ? this.#b() : this.#m();
      } else {
        try {
          this.#a = Y(() => n(this.#t));
        } catch (s) {
          this.error(s);
        }
        this.#l > 0 ? this.#y() : this.#e = !1;
      }
    }, Js), S && (this.#t = $);
  }

  #m() {
    try {
      this.#a = Y(() => this.#n(this.#t));
    } catch (e) {
      this.error(e);
    }
    this.#e = !1;
  }

  #b() {
    const e = this.#s.pending;
    e && (this.#i = Y(() => e(this.#t)), at.enqueue(() => {
      this.#a = this.#p(() => (at.ensure(), Y(() => this.#n(this.#t)))), this.#l > 0 ? this.#y() : (Ht(
        /** @type {Effect} */
        this.#i,
        () => {
          this.#i = null;
        },
      ), this.#e = !1);
    }));
  }

  /**
   * Returns `true` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_pending() {
    return this.#e || !!this.parent && this.parent.is_pending();
  }

  has_pending_snippet() {
    return !!this.#s.pending;
  }

  /**
   * @param {() => Effect | null} fn
   */
  #p(e) {
    const r = w; const n = E; const s = k;
    ht(this.#o), z(this.#o), Gt(this.#o.ctx);
    try {
      return e();
    } catch (i) {
      return vn(i), null;
    } finally {
      ht(r), z(n), Gt(s);
    }
  }

  #y() {
    const e = (
      /** @type {(anchor: Node) => void} */
      this.#s.pending
    );
    this.#a !== null && (this.#c = document.createDocumentFragment(), ti(this.#a, this.#c)), this.#i === null && (this.#i = Y(() => e(this.#t)));
  }

  /**
   * Updates the pending count associated with the currently visible pending snippet,
   * if any, such that we can replace the snippet with content once work is done
   * @param {1 | -1} d
   */
  #g(e) {
    if (!this.has_pending_snippet()) {
      this.parent && this.parent.#g(e);
      return;
    }
    this.#l += e, this.#l === 0 && (this.#e = !1, this.#i && Ht(this.#i, () => {
      this.#i = null;
    }), this.#c && (this.#t.before(this.#c), this.#c = null), xe(() => {
      at.ensure().flush();
    }));
  }

  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   */
  update_pending_count(e) {
    this.#g(e), this.#f += e, Je.add(this.#_);
  }

  get_effect_pending() {
    return this.#v(), _(
      /** @type {Source<number>} */
      this.#h,
    );
  }

  /** @param {unknown} error */
  error(e) {
    const r = this.#s.onerror;
    const n = this.#s.failed;
    if (this.#d || !r && !n) {
      throw e;
    }
    this.#a && (V(this.#a), this.#a = null), this.#i && (V(this.#i), this.#i = null), this.#u && (V(this.#u), this.#u = null), S && (U(
      /** @type {TemplateNode} */
      this.#r,
    ), Ls(), U($e()));
    let s = !1; let i = !1;
    const a = () => {
      if (s) {
        js();
        return;
      }
      s = !0, i && Us(), at.ensure(), this.#f = 0, this.#u !== null && Ht(this.#u, () => {
        this.#u = null;
      }), this.#e = this.has_pending_snippet(), this.#a = this.#p(() => (this.#d = !1, Y(() => this.#n(this.#t)))), this.#l > 0 ? this.#y() : this.#e = !1;
    };
    const o = E;
    try {
      z(null), i = !0, r?.(e, a), i = !1;
    } catch (u) {
      Yt(u, this.#o && this.#o.parent);
    } finally {
      z(o);
    }
    n && xe(() => {
      this.#u = this.#p(() => {
        this.#d = !0;
        try {
          return Y(() => {
            n(
              this.#t,
              () => e,
              () => a,
            );
          });
        } catch (u) {
          return Yt(
            u,
            /** @type {Effect} */
            this.#o.parent,
          ), null;
        } finally {
          this.#d = !1;
        }
      });
    });
  }
}
function ti(t, e) {
  for (let r = t.nodes_start, n = t.nodes_end; r !== null;) {
    const s = r === n ? null : (
      /** @type {TemplateNode} */
      /* @__PURE__ */ dt(r)
    );
    e.append(r), r = s;
  }
}
function ei(t, e, r) {
  const n = Ue;
  if (e.length === 0) {
    r(t.map(n));
    return;
  }
  const s = T; const i = (
    /** @type {Effect} */
    w
  ); const a = ri(); const o = S;
  Promise.all(e.map(u => /* @__PURE__ */ ni(u))).then((u) => {
    a();
    try {
      r([...t.map(n), ...u]);
    } catch (l) {
      (i.f & Qt) === 0 && Yt(l, i);
    }
    o && it(!1), s?.deactivate(), Ze();
  }).catch((u) => {
    Yt(u, i);
  });
}
function ri() {
  const t = w; const e = E; const r = k; const n = T; const s = S;
  if (s) {
    var i = $;
  }
  return function () {
    ht(t), z(e), Gt(r), n?.activate(), s && (it(!0), U(i));
  };
}
function Ze() {
  ht(null), z(null), Gt(null);
}
// @__NO_SIDE_EFFECTS__
function Ue(t) {
  let e = L | W; const r = E !== null && (E.f & L) !== 0 ? (
    /** @type {Derived} */
    E
  ) : null;
  return w === null || r !== null && (r.f & rt) !== 0 ? e |= rt : w.f |= qt, {
    ctx: k,
    deps: null,
    effects: null,
    equals: un,
    f: e,
    fn: t,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      I
    ),
    wv: 0,
    parent: r ?? w,
    ac: null,
  };
}
// @__NO_SIDE_EFFECTS__
function ni(t, e) {
  const r = (
    /** @type {Effect | null} */
    w
  );
  r === null && Ts();
  const n = (
    /** @type {Boundary} */
    r.b
  ); let s = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ); const i = xt(
    /** @type {V} */
    I,
  ); const a = !E; const o = /* @__PURE__ */ new Map();
  return fi(() => {
    const u = nn();
    s = u.promise;
    try {
      Promise.resolve(t()).then(u.resolve, u.reject).then(Ze);
    } catch (f) {
      u.reject(f), Ze();
    }
    const l = (
      /** @type {Batch} */
      T
    ); const c = n.is_pending();
    a && (n.update_pending_count(1), c || (l.increment(), o.get(l)?.reject(Kt), o.delete(l), o.set(l, u)));
    const p = (f, d = void 0) => {
      if (c || l.activate(), d) {
        d !== Kt && (i.f |= kt, ie(i, d));
      } else {
        (i.f & kt) !== 0 && (i.f ^= kt), ie(i, f);
        for (const [h, v] of o) {
          if (o.delete(h), h === l) {
            break;
          }
          v.reject(Kt);
        }
      }
      a && (n.update_pending_count(-1), c || l.decrement());
    };
    u.promise.then(p, f => p(null, f || 'unknown'));
  }), Tn(() => {
    for (const u of o.values()) {
      u.reject(Kt);
    }
  }), new Promise((u) => {
    function l(c) {
      function p() {
        c === s ? u(i) : l(s);
      }
      c.then(p, p);
    }
    l(s);
  });
}
// @__NO_SIDE_EFFECTS__
function qr(t) {
  const e = /* @__PURE__ */ Ue(t);
  return Qn(e), e;
}
// @__NO_SIDE_EFFECTS__
function mn(t) {
  const e = /* @__PURE__ */ Ue(t);
  return e.equals = ln, e;
}
function bn(t) {
  const e = t.effects;
  if (e !== null) {
    t.effects = null;
    for (let r = 0; r < e.length; r += 1) {
      V(
      /** @type {Effect} */
        e[r],
      );
    }
  }
}
function si(t) {
  for (let e = t.parent; e !== null;) {
    if ((e.f & L) === 0) {
      return (
      /** @type {Effect} */
        e
      );
    }
    e = e.parent;
  }
  return null;
}
function Er(t) {
  let e; const r = w;
  ht(si(t));
  try {
    bn(t), e = Ln(t);
  } finally {
    ht(r);
  }
  return e;
}
function wn(t) {
  const e = Er(t);
  if (t.equals(e) || (t.v = e, t.wv = Un()), !Ut) {
    if (nt !== null) {
      nt.set(t, t.v);
    } else {
      const r = (bt || (t.f & rt) !== 0) && t.deps !== null ? St : q;
      j(t, r);
    }
  }
}
const wt = /* @__PURE__ */ new Map();
function xt(t, e) {
  const r = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: t,
    reactions: null,
    equals: un,
    rv: 0,
    wv: 0,
  };
  return r;
}
// @__NO_SIDE_EFFECTS__
function B(t, e) {
  const r = xt(t);
  return Qn(r), r;
}
// @__NO_SIDE_EFFECTS__
function $r(t, e = !1, r = !0) {
  const n = xt(t);
  return e || (n.equals = ln), n;
}
function P(t, e, r = !1) {
  E !== null // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  && (!st || (E.f & Nr) !== 0) && fn() && (E.f & (L | Nt | br | Nr)) !== 0 && !vt?.includes(t) && qs();
  const n = r ? mt(e) : e;
  return ie(t, n);
}
function ie(t, e) {
  if (!t.equals(e)) {
    const r = t.v;
    Ut ? wt.set(t, e) : wt.set(t, r), t.v = e;
    const n = at.ensure();
    n.capture(t, r), (t.f & L) !== 0 && ((t.f & W) !== 0 && Er(
      /** @type {Derived} */
      t,
    ), j(t, (t.f & rt) === 0 ? q : St)), t.wv = Un(), En(t, W), w !== null && (w.f & q) !== 0 && (w.f & (_t | Ot)) === 0 && (Z === null ? vi([t]) : Z.push(t));
  }
  return e;
}
function Et(t) {
  P(t, t.v + 1);
}
function En(t, e) {
  const r = t.reactions;
  if (r !== null) {
    for (let n = r.length, s = 0; s < n; s++) {
      const i = r[s]; const a = i.f; const o = (a & W) === 0;
      o && j(i, e), (a & L) !== 0 ? En(
      /** @type {Derived} */
        i,
        St,
      ) : o && ((a & Nt) !== 0 && Pt !== null && Pt.push(
      /** @type {Effect} */
        i,
      ), It(
      /** @type {Effect} */
        i,
      ));
    }
  }
}
function mt(t) {
  if (typeof t != 'object' || t === null || ge in t) {
    return t;
  }
  const e = Cs(t);
  if (e !== Os && e !== Ss) {
    return t;
  }
  const r = /* @__PURE__ */ new Map(); const n = Ae(t); const s = /* @__PURE__ */ B(0); const i = pt; const a = (o) => {
    if (pt === i) {
      return o();
    }
    const u = E; const l = pt;
    z(null), Kr(i);
    const c = o();
    return z(u), Kr(l), c;
  };
  return n && r.set('length', /* @__PURE__ */ B(
    /** @type {any[]} */
    t.length,
  )), new Proxy(
    /** @type {any} */
    t,
    {
      defineProperty(o, u, l) {
        (!('value' in l) || l.configurable === !1 || l.enumerable === !1 || l.writable === !1) && Ns();
        let c = r.get(u);
        return c === void 0 ? c = a(() => {
          const p = /* @__PURE__ */ B(l.value);
          return r.set(u, p), p;
        }) : P(c, l.value, !0), !0;
      },
      deleteProperty(o, u) {
        const l = r.get(u);
        if (l === void 0) {
          if (u in o) {
            const c = a(() => /* @__PURE__ */ B(I));
            r.set(u, c), Et(s);
          }
        } else {
          P(l, I), Et(s);
        }
        return !0;
      },
      get(o, u, l) {
        if (u === ge) {
          return t;
        }
        let c = r.get(u); const p = u in o;
        if (c === void 0 && (!p || At(o, u)?.writable) && (c = a(() => {
          const d = mt(p ? o[u] : I); const h = /* @__PURE__ */ B(d);
          return h;
        }), r.set(u, c)), c !== void 0) {
          const f = _(c);
          return f === I ? void 0 : f;
        }
        return Reflect.get(o, u, l);
      },
      getOwnPropertyDescriptor(o, u) {
        const l = Reflect.getOwnPropertyDescriptor(o, u);
        if (l && 'value' in l) {
          const c = r.get(u);
          c && (l.value = _(c));
        } else if (l === void 0) {
          const p = r.get(u); const f = p?.v;
          if (p !== void 0 && f !== I) {
            return {
              enumerable: !0,
              configurable: !0,
              value: f,
              writable: !0,
            };
          }
        }
        return l;
      },
      has(o, u) {
        if (u === ge) {
          return !0;
        }
        let l = r.get(u); const c = l !== void 0 && l.v !== I || Reflect.has(o, u);
        if (l !== void 0 || w !== null && (!c || At(o, u)?.writable)) {
          l === void 0 && (l = a(() => {
            const f = c ? mt(o[u]) : I; const d = /* @__PURE__ */ B(f);
            return d;
          }), r.set(u, l));
          const p = _(l);
          if (p === I) {
            return !1;
          }
        }
        return c;
      },
      set(o, u, l, c) {
        let p = r.get(u); let f = u in o;
        if (n && u === 'length') {
          for (let d = l; d /** @type {Source<number>} */
            < p.v; d += 1) {
            let h = r.get(`${d}`);
            h !== void 0 ? P(h, I) : d in o && (h = a(() => /* @__PURE__ */ B(I)), r.set(`${d}`, h));
          }
        }
        if (p === void 0) {
          (!f || At(o, u)?.writable) && (p = a(() => /* @__PURE__ */ B(void 0)), P(p, mt(l)), r.set(u, p));
        } else {
          f = p.v !== I;
          const v = a(() => mt(l));
          P(p, v);
        }
        const y = Reflect.getOwnPropertyDescriptor(o, u);
        if (y?.set && y.set.call(c, l), !f) {
          if (n && typeof u == 'string') {
            const b = (
              /** @type {Source<number>} */
              r.get('length')
            ); const g = Number(u);
            Number.isInteger(g) && g >= b.v && P(b, g + 1);
          }
          Et(s);
        }
        return !0;
      },
      ownKeys(o) {
        _(s);
        const u = Reflect.ownKeys(o).filter((p) => {
          const f = r.get(p);
          return f === void 0 || f.v !== I;
        });
        for (const [l, c] of r) {
          c.v !== I && !(l in o) && u.push(l);
        }
        return u;
      },
      setPrototypeOf() {
        Qs();
      },
    },
  );
}
let Ur, $n, xn, On;
function tr() {
  if (Ur === void 0) {
    Ur = window, $n = /Firefox/.test(navigator.userAgent);
    const t = Element.prototype; const e = Node.prototype; const r = Text.prototype;
    xn = At(e, 'firstChild').get, On = At(e, 'nextSibling').get, Mr(t) && (t.__click = void 0, t.__className = void 0, t.__attributes = null, t.__style = void 0, t.__e = void 0), Mr(r) && (r.__t = void 0);
  }
}
function yt(t = '') {
  return document.createTextNode(t);
}
// @__NO_SIDE_EFFECTS__
function Mt(t) {
  return xn.call(t);
}
// @__NO_SIDE_EFFECTS__
function dt(t) {
  return On.call(t);
}
function D(t, e) {
  if (!S) {
    return /* @__PURE__ */ Mt(t);
  }
  let r = (
    /** @type {TemplateNode} */
    /* @__PURE__ */ Mt($)
  );
  if (r === null) {
    r = $.appendChild(yt());
  } else if (e && r.nodeType !== wr) {
    const n = yt();
    return r?.before(n), U(n), n;
  }
  return U(r), r;
}
function ee(t, e = !1) {
  if (!S) {
    const r = (
      /** @type {DocumentFragment} */
      /* @__PURE__ */ Mt(
        /** @type {Node} */
        t,
      )
    );
    return r instanceof Comment && r.data === '' ? /* @__PURE__ */ dt(r) : r;
  }
  if (e && $?.nodeType !== wr) {
    const n = yt();
    return $?.before(n), U(n), n;
  }
  return $;
}
function H(t, e = 1, r = !1) {
  let n = S ? $ : t;
  for (var s; e--;) {
    s = n, n /** @type {TemplateNode} */
    /* @__PURE__ */ = dt(n);
  }
  if (!S) {
    return n;
  }
  if (r && n?.nodeType !== wr) {
    const i = yt();
    return n === null ? s?.after(i) : n.before(i), U(i), i;
  }
  return U(n), /** @type {TemplateNode} */
  n;
}
function Sn(t) {
  t.textContent = '';
}
function Cn() {
  return !1;
}
function Rn(t) {
  const e = E; const r = w;
  z(null), ht(null);
  try {
    return t();
  } finally {
    z(e), ht(r);
  }
}
function Pn(t) {
  w === null && E === null && ks(), E !== null && (E.f & rt) !== 0 && w === null && As(), Ut && Fs();
}
function ii(t, e) {
  const r = e.last;
  r === null ? e.last = e.first = t : (r.next = t, t.prev = r, e.last = t);
}
function ut(t, e, r, n = !0) {
  const s = w;
  s !== null && (s.f & ot) !== 0 && (t |= ot);
  const i = {
    ctx: k,
    deps: null,
    nodes_start: null,
    nodes_end: null,
    f: t | W,
    first: null,
    fn: e,
    last: null,
    next: null,
    parent: s,
    b: s && s.b,
    prev: null,
    teardown: null,
    transitions: null,
    wv: 0,
    ac: null,
  };
  if (r) {
    try {
      Se(i), i.f |= mr;
    } catch (u) {
      throw V(i), u;
    }
  } else {
    e !== null && It(i);
  }
  if (n) {
    let a = i;
    if (r && a.deps === null && a.teardown === null && a.nodes_start === null && a.first === a.last // either `null`, or a singular child
      && (a.f & qt) === 0 && (a = a.first), a !== null && (a.parent = s, s !== null && ii(a, s), E !== null && (E.f & L) !== 0 && (t & Ot) === 0)) {
      const o = (
        /** @type {Derived} */
        E
      );
      (o.effects ??= []).push(a);
    }
  }
  return i;
}
function ai() {
  return E !== null && !st;
}
function Tn(t) {
  const e = ut(ke, null, !1);
  return j(e, q), e.teardown = t, e;
}
function xr(t) {
  Pn();
  const e = (
    /** @type {Effect} */
    w.f
  ); const r = !E && (e & _t) !== 0 && (e & mr) === 0;
  if (r) {
    const n = (
      /** @type {ComponentContext} */
      k
    );
    (n.e ??= []).push(t);
  } else {
    return Fn(t);
  }
}
function Fn(t) {
  return ut(_r | sn, t, !1);
}
function oi(t) {
  return Pn(), ut(ke | sn, t, !0);
}
function ui(t) {
  at.ensure();
  const e = ut(Ot | qt, t, !0);
  return () => {
    V(e);
  };
}
function li(t) {
  at.ensure();
  const e = ut(Ot | qt, t, !0);
  return (r = {}) => new Promise((n) => {
    r.outro
      ? Ht(e, () => {
          V(e), n(void 0);
        })
      : (V(e), n(void 0));
  });
}
function ci(t) {
  return ut(_r, t, !1);
}
function fi(t) {
  return ut(br | qt, t, !0);
}
function An(t, e = 0) {
  return ut(ke | e, t, !0);
}
function re(t, e = [], r = []) {
  ei(e, r, (n) => {
    ut(ke, () => t(...n.map(_)), !0);
  });
}
function je(t, e = 0) {
  const r = ut(Nt | e, t, !0);
  return r;
}
function Y(t, e = !0) {
  return ut(_t | qt, t, !0, e);
}
function kn(t) {
  const e = t.teardown;
  if (e !== null) {
    const r = Ut; const n = E;
    Lr(!0), z(null);
    try {
      e.call(null);
    } finally {
      Lr(r), z(n);
    }
  }
}
function Dn(t, e = !1) {
  let r = t.first;
  for (t.first = t.last = null; r !== null;) {
    const s = r.ac;
    s !== null && Rn(() => {
      s.abort(Kt);
    });
    const n = r.next;
    (r.f & Ot) !== 0 ? r.parent = null : V(r, e), r = n;
  }
}
function hi(t) {
  for (let e = t.first; e !== null;) {
    const r = e.next;
    (e.f & _t) === 0 && V(e), e = r;
  }
}
function V(t, e = !0) {
  let r = !1;
  (e || (t.f & Ps) !== 0) && t.nodes_start !== null && t.nodes_end !== null && (di(
    t.nodes_start,
    /** @type {TemplateNode} */
    t.nodes_end,
  ), r = !0), Dn(t, e && !r), Oe(t, 0), j(t, Qt);
  const n = t.transitions;
  if (n !== null) {
    for (const i of n) {
      i.stop();
    }
  }
  kn(t);
  const s = t.parent;
  s !== null && s.first !== null && In(t), t.next = t.prev = t.teardown = t.ctx = t.deps = t.fn = t.nodes_start = t.nodes_end = t.ac = null;
}
function di(t, e) {
  for (; t !== null;) {
    const r = t === e ? null : (
      /** @type {TemplateNode} */
      /* @__PURE__ */ dt(t)
    );
    t.remove(), t = r;
  }
}
function In(t) {
  const e = t.parent; const r = t.prev; const n = t.next;
  r !== null && (r.next = n), n !== null && (n.prev = r), e !== null && (e.first === t && (e.first = n), e.last === t && (e.last = r));
}
function Ht(t, e) {
  const r = [];
  Or(t, r, !0), Mn(r, () => {
    V(t), e && e();
  });
}
function Mn(t, e) {
  let r = t.length;
  if (r > 0) {
    const n = () => --r || e();
    for (const s of t) {
      s.out(n);
    }
  } else {
    e();
  }
}
function Or(t, e, r) {
  if ((t.f & ot) === 0) {
    if (t.f ^= ot, t.transitions !== null) {
      for (const a of t.transitions) {
        (a.is_global || r) && e.push(a);
      }
    }
    for (let n = t.first; n !== null;) {
      const s = n.next; const i = (n.f & le) !== 0 || (n.f & _t) !== 0;
      Or(n, e, i ? r : !1), n = s;
    }
  }
}
function Sr(t) {
  Nn(t, !0);
}
function Nn(t, e) {
  if ((t.f & ot) !== 0) {
    t.f ^= ot, (t.f & q) === 0 && (j(t, W), It(t));
    for (let r = t.first; r !== null;) {
      const n = r.next; const s = (r.f & le) !== 0 || (r.f & _t) !== 0;
      Nn(r, s ? e : !1), r = n;
    }
    if (t.transitions !== null) {
      for (const i of t.transitions) {
        (i.is_global || e) && i.in();
      }
    }
  }
}
let Bt = !1;
function jr(t) {
  Bt = t;
}
let Ut = !1;
function Lr(t) {
  Ut = t;
}
let E = null; let st = !1;
function z(t) {
  E = t;
}
let w = null;
function ht(t) {
  w = t;
}
let vt = null;
function Qn(t) {
  E !== null && (vt === null ? vt = [t] : vt.push(t));
}
let Q = null; let G = 0; let Z = null;
function vi(t) {
  Z = t;
}
let qn = 1; let ae = 0; let pt = ae;
function Kr(t) {
  pt = t;
}
let bt = !1;
function Un() {
  return ++qn;
}
function Le(t) {
  const e = t.f;
  if ((e & W) !== 0) {
    return !0;
  }
  if ((e & St) !== 0) {
    const r = t.deps; const n = (e & rt) !== 0;
    if (r !== null) {
      let s; let i; const a = (e & Ee) !== 0; const o = n && w !== null && !bt; const u = r.length;
      if ((a || o) && (w === null || (w.f & Qt) === 0)) {
        const l = (
          /** @type {Derived} */
          t
        ); const c = l.parent;
        for (s = 0; s < u; s++) {
          i = r[s], (a || !i?.reactions?.includes(l)) && (i.reactions ??= []).push(l);
        }
        a && (l.f ^= Ee), o && c !== null && (c.f & rt) === 0 && (l.f ^= rt);
      }
      for (s = 0; s < u; s++) {
        if (i = r[s], Le(
        /** @type {Derived} */
          i,
        ) && wn(
        /** @type {Derived} */
          i,
        ), i.wv > t.wv) {
          return !0;
        }
      }
    }
    (!n || w !== null && !bt) && j(t, q);
  }
  return !1;
}
function jn(t, e, r = !0) {
  const n = t.reactions;
  if (n !== null && !vt?.includes(t)) {
    for (let s = 0; s < n.length; s++) {
      const i = n[s];
      (i.f & L) !== 0 ? jn(
      /** @type {Derived} */
        i,
        e,
        !1,
      ) : e === i && (r ? j(i, W) : (i.f & q) !== 0 && j(i, St), It(
      /** @type {Effect} */
        i,
      ));
    }
  }
}
function Ln(t) {
  const e = Q; const r = G; let n = Z; const s = E; const i = bt; const a = vt; const o = k; const u = st; const l = pt; const c = t.f;
  Q /** @type {null | Value[]} */
    = null, G = 0, Z = null, bt = (c & rt) !== 0 && (st || !Bt || E === null), E = (c & (_t | Ot)) === 0 ? t : null, vt = null, Gt(t.ctx), st = !1, pt = ++ae, t.ac !== null && (Rn(() => {
    t.ac.abort(Kt);
  }), t.ac = null);
  try {
    t.f |= We;
    const p = (
      /** @type {Function} */
      t.fn
    ); const f = p(); let d = t.deps;
    if (Q !== null) {
      var h;
      if (Oe(t, G), d !== null && G > 0) {
        for (d.length = G + Q.length, h = 0; h < Q.length; h++) {
          d[G + h] = Q[h];
        }
      } else {
        t.deps = d = Q;
      }
      if (!bt // Deriveds that already have reactions can cleanup, so we still add them as reactions
        || (c & L) !== 0 /** @type {import('#client').Derived} */
        && t.reactions !== null) {
        for (h = G; h < d.length; h++) {
          (d[h].reactions ??= []).push(t);
        }
      }
    } else {
      d !== null && G < d.length && (Oe(t, G), d.length = G);
    }
    if (fn() && Z !== null && !st && d !== null && (t.f & (L | St | W)) === 0) {
      for (h = 0; h /** @type {Source[]} */
        < Z.length; h++) {
        jn(
          Z[h],
          /** @type {Effect} */
          t,
        );
      }
    }
    return s !== null && s !== t && (ae++, Z !== null && (n === null ? n = Z : n.push(...Z))), (t.f & kt) !== 0 && (t.f ^= kt), f;
  } catch (v) {
    return vn(v);
  } finally {
    t.f ^= We, Q = e, G = r, Z = n, E = s, bt = i, vt = a, Gt(o), st = u, pt = l;
  }
}
function pi(t, e) {
  let r = e.reactions;
  if (r !== null) {
    const n = xs.call(r, t);
    if (n !== -1) {
      const s = r.length - 1;
      s === 0 ? r = e.reactions = null : (r[n] = r[s], r.pop());
    }
  }
  r === null && (e.f & L) !== 0 // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  && (Q === null || !Q.includes(e)) && (j(e, St), (e.f & (rt | Ee)) === 0 && (e.f ^= Ee), bn(
    /** @type {Derived} **/
    e,
  ), Oe(
    /** @type {Derived} **/
    e,
    0,
  ));
}
function Oe(t, e) {
  const r = t.deps;
  if (r !== null) {
    for (let n = e; n < r.length; n++) {
      pi(t, r[n]);
    }
  }
}
function Se(t) {
  const e = t.f;
  if ((e & Qt) === 0) {
    j(t, q);
    const r = w; const n = Bt;
    w = t, Bt = !0;
    try {
      (e & Nt) !== 0 ? hi(t) : Dn(t), kn(t);
      const s = Ln(t);
      t.teardown = typeof s == 'function' ? s : null, t.wv = qn;
      let i;
      rn && Hs && (t.f & W) !== 0 && t.deps;
    } finally {
      Bt = n, w = r;
    }
  }
}
function _(t) {
  const e = t.f; const r = (e & L) !== 0;
  if (E !== null && !st) {
    const n = w !== null && (w.f & Qt) !== 0;
    if (!n && !vt?.includes(t)) {
      const s = E.deps;
      if ((E.f & We) !== 0) {
        t.rv < ae && (t.rv = ae, Q === null && s !== null && s[G] === t ? G++ : Q === null ? Q = [t] : (!bt || !Q.includes(t)) && Q.push(t));
      } else {
        (E.deps ??= []).push(t);
        const i = t.reactions;
        i === null ? t.reactions = [E] : i.includes(E) || i.push(E);
      }
    }
  } else if (r /** @type {Derived} */
    && t.deps === null /** @type {Derived} */
    && t.effects === null) {
    var a = (
      /** @type {Derived} */
      t
    ); const o = a.parent;
    o !== null && (o.f & rt) === 0 && (a.f ^= rt);
  }
  if (Ut) {
    if (wt.has(t)) {
      return wt.get(t);
    }
    if (r) {
      a /** @type {Derived} */
        = t;
      let u = a.v;
      return ((a.f & q) === 0 && a.reactions !== null || Kn(a)) && (u = Er(a)), wt.set(a, u), u;
    }
  } else if (r) {
    if (a /** @type {Derived} */
      = t, nt?.has(a)) {
      return nt.get(a);
    }
    Le(a) && wn(a);
  }
  if (nt?.has(t)) {
    return nt.get(t);
  }
  if ((t.f & kt) !== 0) {
    throw t.v;
  }
  return t.v;
}
function Kn(t) {
  if (t.v === I) {
    return !0;
  }
  if (t.deps === null) {
    return !1;
  }
  for (const e of t.deps) {
    if (wt.has(e) || (e.f & L) !== 0 && Kn(
    /** @type {Derived} */
      e,
    )) {
      return !0;
    }
  }
  return !1;
}
function Xt(t) {
  const e = st;
  try {
    return st = !0, t();
  } finally {
    st = e;
  }
}
const yi = -7169;
function j(t, e) {
  t.f = t.f & yi | e;
}
const Hn = /* @__PURE__ */ new Set(); const er = /* @__PURE__ */ new Set();
function Bn(t) {
  for (let e = 0; e < t.length; e++) {
    Hn.add(t[e]);
  }
  for (const r of er) {
    r(t);
  }
}
let Hr = null;
function pe(t) {
  const e = this; const r = (
    /** @type {Node} */
    e.ownerDocument
  ); const n = t.type; const s = t.composedPath?.() || []; let i = (
    /** @type {null | Element} */
    s[0] || t.target
  );
  Hr = t;
  let a = 0; const o = Hr === t && t.__root;
  if (o) {
    const u = s.indexOf(o);
    if (u !== -1 && (e === document || e /** @type {any} */
      === window)) {
      t.__root = e;
      return;
    }
    const l = s.indexOf(e);
    if (l === -1) {
      return;
    }
    u <= l && (a = u);
  }
  if (i /** @type {Element} */
    = s[a] || t.target, i !== e) {
    Dt(t, 'currentTarget', {
      configurable: !0,
      get() {
        return i || r;
      },
    });
    const c = E; const p = w;
    z(null), ht(null);
    try {
      for (var f, d = []; i !== null;) {
        const h = i.assignedSlot || i.parentNode /** @type {any} */
          || i.host || null;
        try {
          const v = i[`__${n}`];
          if (v != null && (!i.disabled // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
            || t.target === i)) {
            if (Ae(v)) {
              const [y, ...b] = v;
              y.apply(i, [t, ...b]);
            } else {
              v.call(i, t);
            }
          }
        } catch (g) {
          f ? d.push(g) : f = g;
        }
        if (t.cancelBubble || h === e || h === null) {
          break;
        }
        i = h;
      }
      if (f) {
        for (const g of d) {
          queueMicrotask(() => {
            throw g;
          });
        }
        throw f;
      }
    } finally {
      t.__root = e, delete t.currentTarget, z(c), ht(p);
    }
  }
}
function _i(t) {
  const e = document.createElement('template');
  return e.innerHTML = t.replaceAll('<!>', '<!---->'), e.content;
}
function zt(t, e) {
  const r = (
    /** @type {Effect} */
    w
  );
  r.nodes_start === null && (r.nodes_start = t, r.nodes_end = e);
}
// @__NO_SIDE_EFFECTS__
function Zt(t, e) {
  const r = (e & Es) !== 0; const n = (e & $s) !== 0; let s; const i = !t.startsWith('<!>');
  return () => {
    if (S) {
      return zt($, null), $;
    }
    s === void 0 && (s = _i(i ? t : `<!>${t}`), r || (s /** @type {Node} */
    /* @__PURE__ */ = Mt(s)));
    const a = (
      /** @type {TemplateNode} */
      n || $n ? document.importNode(s, !0) : s.cloneNode(!0)
    );
    if (r) {
      const o = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Mt(a)
      ); const u = (
        /** @type {TemplateNode} */
        a.lastChild
      );
      zt(o, u);
    } else {
      zt(a, a);
    }
    return a;
  };
}
function rr() {
  if (S) {
    return zt($, null), $;
  }
  const t = document.createDocumentFragment(); const e = document.createComment(''); const r = yt();
  return t.append(e, r), zt(e, r), t;
}
function ct(t, e) {
  if (S) {
    w.nodes_end = $, Me();
    return;
  }
  t !== null && t.before(
    /** @type {Node} */
    e,
  );
}
const gi = ['touchstart', 'touchmove'];
function mi(t) {
  return gi.includes(t);
}
function gt(t, e) {
  const r = e == null ? '' : typeof e == 'object' ? `${e}` : e;
  r !== (t.__t ??= t.nodeValue) && (t.__t = r, t.nodeValue = `${r}`);
}
function zn(t, e) {
  return Vn(t, e);
}
function bi(t, e) {
  tr(), e.intro = e.intro ?? !1;
  const r = e.target; const n = S; const s = $;
  try {
    for (var i = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ Mt(r)
    ); i && (i.nodeType !== Jt /** @type {Comment} */
      || i.data !== en);) {
      i /** @type {TemplateNode} */
      /* @__PURE__ */ = dt(i);
    }
    if (!i) {
      throw Vt;
    }

    it(!0), U(
      /** @type {Comment} */
      i,
    );

    const a = Vn(t, { ...e, anchor: i });
    return it(!1), /**  @type {Exports} */
    a;
  } catch (a) {
    if (a instanceof Error && a.message.split(`
`).some(o => o.startsWith('https://svelte.dev/e/'))) {
      throw a;
    }
    return a !== Vt && console.warn('Failed to hydrate: ', a), e.recover === !1 && Is(), tr(), Sn(r), it(!1), zn(t, e);
  } finally {
    it(n), U(s);
  }
}
const Lt = /* @__PURE__ */ new Map();
function Vn(t, { target: e, anchor: r, props: n = {}, events: s, context: i, intro: a = !0 }) {
  tr();
  const o = /* @__PURE__ */ new Set(); const u = (p) => {
    for (let f = 0; f < p.length; f++) {
      const d = p[f];
      if (!o.has(d)) {
        o.add(d);
        const h = mi(d);
        e.addEventListener(d, pe, { passive: h });
        const v = Lt.get(d);
        v === void 0 ? (document.addEventListener(d, pe, { passive: h }), Lt.set(d, 1)) : Lt.set(d, v + 1);
      }
    }
  };
  u(yr(Hn)), er.add(u);
  let l = void 0; const c = li(() => {
    const p = r ?? e.appendChild(yt());
    return Xs(
      /** @type {TemplateNode} */
      p,
      {
        pending: () => {
        },
      },
      (f) => {
        if (i) {
          Ne({});
          const d = (
            /** @type {ComponentContext} */
            k
          );
          d.c = i;
        }
        if (s && (n.$$events = s), S && zt(
          /** @type {TemplateNode} */
          f,
          null,
        ), l = t(f, n) || {}, S && (w.nodes_end = $, $ === null || $.nodeType !== Jt /** @type {Comment} */
        || $.data !== pr)) {
          throw Ie(), Vt;
        }
        i && Qe();
      },
    ), () => {
      for (const f of o) {
        e.removeEventListener(f, pe);
        let d = (
          /** @type {number} */
          Lt.get(f)
        );
        --d === 0 ? (document.removeEventListener(f, pe), Lt.delete(f)) : Lt.set(f, d);
      }
      er.delete(u), p !== r && p.parentNode?.removeChild(p);
    };
  });
  return nr.set(l, c), l;
}
let nr = /* @__PURE__ */ new WeakMap();
function wi(t, e) {
  const r = nr.get(t);
  return r ? (nr.delete(t), r(e)) : Promise.resolve();
}
function Ei(t, e, ...r) {
  let n = t; let s = we; let i;
  je(() => {
    s !== (s = e()) && (i && (V(i), i = null), i = Y(() => (
      /** @type {SnippetFn} */
      s(n, ...r)
    )));
  }, le), S && (n = $);
}
function Gn(t) {
  k === null && De(), xr(() => {
    const e = Xt(t);
    if (typeof e == 'function') {
      return (
      /** @type {() => void} */
        e
      );
    }
  });
}
function $i(t) {
  k === null && De(), Gn(() => () => Xt(t));
}
function xi(t, e, { bubbles: r = !1, cancelable: n = !1 } = {}) {
  return new CustomEvent(t, { detail: e, bubbles: r, cancelable: n });
}
function Yn() {
  const t = k;
  return t === null && De(), (e, r, n) => {
    const s = (
      /** @type {Record<string, Function | Function[]>} */
      t.s.$$events?.[
        /** @type {string} */
        e
      ]
    );
    if (s) {
      const i = Ae(s) ? s.slice() : [s]; const a = xi(
        /** @type {string} */
        e,
        r,
        n,
      );
      for (const o of i) {
        o.call(t.x, a);
      }
      return !a.defaultPrevented;
    }
    return !0;
  };
}
function Ve(t, e, r = !1) {
  S && Me();
  let n = t; let s = null; let i = null; let a = I; const o = r ? le : 0; let u = !1;
  const l = (d, h = !0) => {
    u = !0, f(h, d);
  };
  let c = null;
  function p() {
    c !== null && (c.lastChild.remove(), n.before(c), c = null);
    const d = a ? s : i; const h = a ? i : s;
    d && Sr(d), h && Ht(h, () => {
      a ? i = null : s = null;
    });
  }
  const f = (d, h) => {
    if (a === (a = d)) {
      return;
    }
    let v = !1;
    if (S) {
      const x = on(n) === Fe;
      !!a === x && (n = $e(), U(n), it(!1), v = !0);
    }
    const y = Cn(); let b = n;
    if (y && (c = document.createDocumentFragment(), c.append(b = yt())), a ? s ??= h && Y(() => h(b)) : i ??= h && Y(() => h(b)), y) {
      const g = (
        /** @type {Batch} */
        T
      ); const m = a ? s : i; const O = a ? i : s;
      m && g.skipped_effects.delete(m), O && g.skipped_effects.add(O), g.add_callback(p);
    } else {
      p();
    }
    v && it(!0);
  };
  je(() => {
    u = !1, e(l), u || f(null, null);
  }, o), S && (n = $);
}
function Oi(t, e) {
  return e;
}
function Si(t, e, r) {
  for (var n = t.items, s = [], i = e.length, a = 0; a < i; a++) {
    Or(e[a].e, s, !0);
  }
  const o = i > 0 && s.length === 0 && r !== null;
  if (o) {
    const u = (
      /** @type {Element} */
      /** @type {Element} */
      r.parentNode
    );
    Sn(u), u.append(
      /** @type {Element} */
      r,
    ), n.clear(), lt(t, e[0].prev, e[i - 1].next);
  }
  Mn(s, () => {
    for (let l = 0; l < i; l++) {
      const c = e[l];
      o || (n.delete(c.k), lt(t, c.prev, c.next)), V(c.e, !o);
    }
  });
}
function Ci(t, e, r, n, s, i = null) {
  let a = t; const o = { flags: e, items: /* @__PURE__ */ new Map(), first: null };
  {
    const u = (
      /** @type {Element} */
      t
    );
    a = S ? U(
      /** @type {Comment | Text} */
      /* @__PURE__ */ Mt(u),
    ) : u.appendChild(yt());
  }
  S && Me();
  let l = null; let c = !1; const p = /* @__PURE__ */ new Map(); const f = /* @__PURE__ */ mn(() => {
    const y = r();
    return Ae(y) ? y : y == null ? [] : yr(y);
  }); let d; let h;
  function v() {
    Ri(
      h,
      d,
      o,
      p,
      a,
      s,
      e,
      n,
      r,
    ), i !== null && (d.length === 0
      ? l ? Sr(l) : l = Y(() => i(a))
      : l !== null && Ht(l, () => {
        l = null;
      }));
  }
  je(() => {
    h /** @type {Effect} */
      ??= w, d /** @type {V[]} */
      = _(f);
    const y = d.length;
    if (c && y === 0) {
      return;
    }
    c = y === 0;
    let b = !1;
    if (S) {
      const g = on(a) === Fe;
      g !== (y === 0) && (a = $e(), U(a), it(!1), b = !0);
    }
    if (S) {
      for (var m = null, O, x = 0; x < y; x++) {
        if ($.nodeType === Jt /** @type {Comment} */
          && $.data === pr) {
          a /** @type {Comment} */
            = $, b = !0, it(!1);
          break;
        }
        var N = d[x]; var C = n(N, x);
        O = sr(
          $,
          o,
          m,
          null,
          N,
          C,
          x,
          s,
          e,
          r,
        ), o.items.set(C, O), m = O;
      }
      y > 0 && U($e());
    }
    if (S) {
      y === 0 && i && (l = Y(() => i(a)));
    } else if (Cn()) {
      const R = /* @__PURE__ */ new Set(); const F = (
        /** @type {Batch} */
        T
      );
      for (x = 0; x < y; x += 1) {
        N = d[x], C = n(N, x);
        const K = o.items.get(C) ?? p.get(C);
        K
          ? Wn(K, N, x)
          : (O = sr(
              null,
              o,
              null,
              null,
              N,
              C,
              x,
              s,
              e,
              r,
              !0,
            ), p.set(C, O)), R.add(C);
      }
      for (const [J, X] of o.items) {
        R.has(J) || F.skipped_effects.add(X.e);
      }
      F.add_callback(v);
    } else {
      v();
    }
    b && it(!0), _(f);
  }), S && (a = $);
}
function Ri(t, e, r, n, s, i, a, o, u) {
  const l = e.length; const c = r.items; const p = r.first; let f = p; let d; let h = null; let v = []; let y = []; let b; let g; let m; let O;
  for (O = 0; O < l; O += 1) {
    if (b = e[O], g = o(b, O), m = c.get(g), m === void 0) {
      const x = n.get(g);
      if (x !== void 0) {
        n.delete(g), c.set(g, x);
        const N = h ? h.next : f;
        lt(r, h, x), lt(r, x, N), Ge(x, N, s), h = x;
      } else {
        const C = f ? (
          /** @type {TemplateNode} */
          f.e.nodes_start
        ) : s;
        h = sr(
          C,
          r,
          h,
          h === null ? r.first : h.next,
          b,
          g,
          O,
          i,
          a,
          u,
        );
      }
      c.set(g, h), v = [], y = [], f = h.next;
      continue;
    }
    if (Wn(m, b, O), (m.e.f & ot) !== 0 && Sr(m.e), m !== f) {
      if (d !== void 0 && d.has(m)) {
        if (v.length < y.length) {
          const R = y[0]; var F;
          h = R.prev;
          const K = v[0]; const J = v[v.length - 1];
          for (F = 0; F < v.length; F += 1) {
            Ge(v[F], R, s);
          }
          for (F = 0; F < y.length; F += 1) {
            d.delete(y[F]);
          }
          lt(r, K.prev, J.next), lt(r, h, K), lt(r, J, R), f = R, h = J, O -= 1, v = [], y = [];
        } else {
          d.delete(m), Ge(m, f, s), lt(r, m.prev, m.next), lt(r, m, h === null ? r.first : h.next), lt(r, h, m), h = m;
        }
        continue;
      }
      for (v = [], y = []; f !== null && f.k !== g;) {
        (f.e.f & ot) === 0 && (d ??= /* @__PURE__ */ new Set()).add(f), y.push(f), f = f.next;
      }
      if (f === null) {
        continue;
      }
      m = f;
    }
    v.push(m), h = m, f = m.next;
  }
  if (f !== null || d !== void 0) {
    for (var X = d === void 0 ? [] : yr(d); f !== null;) {
      (f.e.f & ot) === 0 && X.push(f), f = f.next;
    }
    const Ct = X.length;
    if (Ct > 0) {
      const Rt = l === 0 ? s : null;
      Si(r, X, Rt);
    }
  }
  t.first = r.first && r.first.e, t.last = h && h.e;
  for (const jt of n.values()) {
    V(jt.e);
  }
  n.clear();
}
function Wn(t, e, r, n) {
  ie(t.v, e), t.i = r;
}
function sr(t, e, r, n, s, i, a, o, u, l, c) {
  const p = (u & ps) !== 0; const f = (u & _s) === 0; const d = p ? f ? /* @__PURE__ */ $r(s, !1, !1) : xt(s) : s; const h = (u & ys) === 0 ? a : xt(a); const v = {
    i: h,
    v: d,
    k: i,
    a: null,
    // @ts-expect-error
    e: null,
    prev: r,
    next: n,
  };
  try {
    if (t === null) {
      const y = document.createDocumentFragment();
      y.append(t = yt());
    }
    return v.e = Y(() => o(
      /** @type {Node} */
      t,
      d,
      h,
      l,
    ), S), v.e.prev = r && r.e, v.e.next = n && n.e, r === null ? c || (e.first = v) : (r.next = v, r.e.next = v.e), n !== null && (n.prev = v, n.e.prev = v.e), v;
  } finally {
  }
}
function Ge(t, e, r) {
  for (let n = t.next ? (
    /** @type {TemplateNode} */
      t.next.e.nodes_start
    ) : r, s = e ? (
    /** @type {TemplateNode} */
      e.e.nodes_start
    ) : r, i = (
    /** @type {TemplateNode} */
      t.e.nodes_start
    ); i !== null && i !== n;) {
    const a = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ dt(i)
    );
    s.before(i), i = a;
  }
}
function lt(t, e, r) {
  e === null ? t.first = r : (e.next = r, e.e.next = r && r.e), r !== null && (r.prev = e, r.e.prev = e && e.e);
}
function Jn(t, e) {
  ci(() => {
    const r = t.getRootNode(); const n = (
      /** @type {ShadowRoot} */
      r.host ? (
        /** @type {ShadowRoot} */
        r
      ) : (
        /** @type {Document} */
        r.head /** @type {Document} */
        ?? r.ownerDocument.head
      )
    );
    if (!n.querySelector(`#${e.hash}`)) {
      const s = document.createElement('style');
      s.id = e.hash, s.textContent = e.code, n.appendChild(s);
    }
  });
}
function Xn(t, e, r) {
  if (t == null) {
    return e(void 0), we;
  }
  const n = Xt(
    () => t.subscribe(
      e,
      // @ts-expect-error
      r,
    ),
  );
  return n.unsubscribe ? () => n.unsubscribe() : n;
}
function Pi(t) {
  let e;
  return Xn(t, r => e = r)(), e;
}
let ye = !1; const ir = Symbol();
function Ti(t, e, r) {
  const n = r[e] ??= {
    store: null,
    source: /* @__PURE__ */ $r(void 0),
    unsubscribe: we,
  };
  if (n.store !== t && !(ir in r)) {
    if (n.unsubscribe(), n.store = t ?? null, t == null) {
      n.source.v = void 0, n.unsubscribe = we;
    } else {
      let s = !0;
      n.unsubscribe = Xn(t, (i) => {
        s ? n.source.v = i : P(n.source, i);
      }), s = !1;
    }
  }
  return t && ir in r ? Pi(t) : _(n.source);
}
function Fi() {
  const t = {};
  function e() {
    Tn(() => {
      for (const r in t) {
        t[r].unsubscribe();
      }
      Dt(t, ir, {
        enumerable: !1,
        value: !0,
      });
    });
  }
  return [t, e];
}
function Ai(t) {
  const e = ye;
  try {
    return ye = !1, [t(), ye];
  } finally {
    ye = e;
  }
}
function Ce(t, e, r, n) {
  const s = (r & bs) !== 0; const i = (r & ws) !== 0; let a = (
    /** @type {V} */
    n
  ); let o = !0; const u = () => (o && (o = !1, a = i ? Xt(
    /** @type {() => V} */
    n,
  ) : (
    /** @type {V} */
    n
  )), a); let l;
  if (s) {
    const c = ge in t || an in t;
    l = At(t, e)?.set ?? (c && e in t ? g => t[e] = g : void 0);
  }
  let p; let f = !1;
  s ? [p, f] = Ai(() => (
    /** @type {V} */
    t[e]
  )) : p /** @type {V} */
    = t[e], p === void 0 && n !== void 0 && (p = u(), l && (Ms(), l(p)));
  let d;
  if (d = () => {
    const g = (
      /** @type {V} */
      t[e]
    );
    return g === void 0 ? u() : (o = !0, g);
  }, (r & ms) === 0) {
    return d;
  }
  if (l) {
    const h = t.$$legacy;
    return (
      /** @type {() => V} */
      function (g, m) {
        return arguments.length > 0 ? ((!m || h || f) && l(m ? d() : g), g) : d();
      }
    );
  }
  let v = !1; const y = ((r & gs) !== 0 ? Ue : mn)(() => (v = !1, d()));
  s && _(y);
  const b = (
    /** @type {Effect} */
    w
  );
  return (
    /** @type {() => V} */
    function (g, m) {
      if (arguments.length > 0) {
        const O = m ? _(y) : s ? mt(g) : g;
        return P(y, O), v = !0, a !== void 0 && (a = O), g;
      }
      return Ut && v || (b.f & Qt) !== 0 ? y.v : _(y);
    }
  );
}
function ki(t) {
  return new Di(t);
}
class Di {
  /** @type {any} */
  #e;
  /** @type {Record<string, any>} */
  #t;
  /**
   * @param {ComponentConstructorOptions & {
   *  component: any;
   * }} options
   */
  constructor(e) {
    const r = /* @__PURE__ */ new Map(); const n = (i, a) => {
      const o = /* @__PURE__ */ $r(a, !1, !1);
      return r.set(i, o), o;
    };
    const s = new Proxy(
      { ...e.props || {}, $$events: {} },
      {
        get(i, a) {
          return _(r.get(a) ?? n(a, Reflect.get(i, a)));
        },
        has(i, a) {
          return a === an ? !0 : (_(r.get(a) ?? n(a, Reflect.get(i, a))), Reflect.has(i, a));
        },
        set(i, a, o) {
          return P(r.get(a) ?? n(a, o), o), Reflect.set(i, a, o);
        },
      },
    );
    this.#t = (e.hydrate ? bi : zn)(e.component, {
      target: e.target,
      anchor: e.anchor,
      props: s,
      context: e.context,
      intro: e.intro ?? !1,
      recover: e.recover,
    }), (!e?.props?.$$host || e.sync === !1) && se(), this.#e = s.$$events;
    for (const i of Object.keys(this.#t)) {
      i === '$set' || i === '$destroy' || i === '$on' || Dt(this, i, {
        get() {
          return this.#t[i];
        },
        /** @param {any} value */
        set(a) {
          this.#t[i] = a;
        },
        enumerable: !0,
      });
    }
    this.#t.$set /** @param {Record<string, any>} next */
      = (i) => {
        Object.assign(s, i);
      }, this.#t.$destroy = () => {
      wi(this.#t);
    };
  }

  /** @param {Record<string, any>} props */
  $set(e) {
    this.#t.$set(e);
  }

  /**
   * @param {string} event
   * @param {(...args: any[]) => any} callback
   * @returns {any}
   */
  $on(e, r) {
    this.#e[e] = this.#e[e] || [];
    const n = (...s) => r.call(this, ...s);
    return this.#e[e].push(n), () => {
      this.#e[e] = this.#e[e].filter(
        /** @param {any} fn */
        s => s !== n,
      );
    };
  }

  $destroy() {
    this.#t.$destroy();
  }
}
let Zn;
typeof HTMLElement == 'function' && (Zn = class extends HTMLElement {
  /** The Svelte component constructor */
  $$ctor;
  /** Slots */
  $$s;
  /** @type {any} The Svelte component instance */
  $$c;
  /** Whether or not the custom element is connected */
  $$cn = !1;
  /** @type {Record<string, any>} Component props data */
  $$d = {};
  /** `true` if currently in the process of reflecting component props back to attributes */
  $$r = !1;
  /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
  $$p_d = {};
  /** @type {Record<string, EventListenerOrEventListenerObject[]>} Event listeners */
  $$l = {};
  /** @type {Map<EventListenerOrEventListenerObject, Function>} Event listener unsubscribe functions */
  $$l_u = /* @__PURE__ */ new Map();
  /** @type {any} The managed render effect for reflecting attributes */
  $$me;
  /**
   * @param {*} $$componentCtor
   * @param {*} $$slots
   * @param {*} use_shadow_dom
   */
  constructor(t, e, r) {
    super(), this.$$ctor = t, this.$$s = e, r && this.attachShadow({ mode: 'open' });
  }

  /**
   * @param {string} type
   * @param {EventListenerOrEventListenerObject} listener
   * @param {boolean | AddEventListenerOptions} [options]
   */
  addEventListener(t, e, r) {
    if (this.$$l[t] = this.$$l[t] || [], this.$$l[t].push(e), this.$$c) {
      const n = this.$$c.$on(t, e);
      this.$$l_u.set(e, n);
    }
    super.addEventListener(t, e, r);
  }

  /**
   * @param {string} type
   * @param {EventListenerOrEventListenerObject} listener
   * @param {boolean | AddEventListenerOptions} [options]
   */
  removeEventListener(t, e, r) {
    if (super.removeEventListener(t, e, r), this.$$c) {
      const n = this.$$l_u.get(e);
      n && (n(), this.$$l_u.delete(e));
    }
  }

  async connectedCallback() {
    if (this.$$cn = !0, !this.$$c) {
      const t = function (n) {
        return (s) => {
          const i = document.createElement('slot');
          n !== 'default' && (i.name = n), ct(s, i);
        };
      };
      if (await Promise.resolve(), !this.$$cn || this.$$c) {
        return;
      }
      const e = {}; const r = Ii(this);
      for (const n of this.$$s) {
        n in r && (n === 'default' && !this.$$d.children ? (this.$$d.children = t(n), e.default = !0) : e[n] = t(n));
      }
      for (const n of this.attributes) {
        const s = this.$$g_p(n.name);
        s in this.$$d || (this.$$d[s] = me(s, n.value, this.$$p_d, 'toProp'));
      }
      for (const n in this.$$p_d) {
        !(n in this.$$d) && this[n] !== void 0 && (this.$$d[n] = this[n], delete this[n]);
      }
      this.$$c = ki({
        component: this.$$ctor,
        target: this.shadowRoot || this,
        props: {
          ...this.$$d,
          $$slots: e,
          $$host: this,
        },
      }), this.$$me = ui(() => {
        An(() => {
          this.$$r = !0;
          for (const n of be(this.$$c)) {
            if (!this.$$p_d[n]?.reflect) {
              continue;
            }
            this.$$d[n] = this.$$c[n];
            const s = me(
              n,
              this.$$d[n],
              this.$$p_d,
              'toAttribute',
            );
            s == null ? this.removeAttribute(this.$$p_d[n].attribute || n) : this.setAttribute(this.$$p_d[n].attribute || n, s);
          }
          this.$$r = !1;
        });
      });
      for (const n in this.$$l) {
        for (const s of this.$$l[n]) {
          const i = this.$$c.$on(n, s);
          this.$$l_u.set(s, i);
        }
      }
      this.$$l = {};
    }
  }

  // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
  // and setting attributes through setAttribute etc, this is helpful
  /**
   * @param {string} attr
   * @param {string} _oldValue
   * @param {string} newValue
   */
  attributeChangedCallback(t, e, r) {
    this.$$r || (t = this.$$g_p(t), this.$$d[t] = me(t, r, this.$$p_d, 'toProp'), this.$$c?.$set({ [t]: this.$$d[t] }));
  }

  disconnectedCallback() {
    this.$$cn = !1, Promise.resolve().then(() => {
      !this.$$cn && this.$$c && (this.$$c.$destroy(), this.$$me(), this.$$c = void 0);
    });
  }

  /**
   * @param {string} attribute_name
   */
  $$g_p(t) {
    return be(this.$$p_d).find(
      e => this.$$p_d[e].attribute === t || !this.$$p_d[e].attribute && e.toLowerCase() === t,
    ) || t;
  }
});
function me(t, e, r, n) {
  const s = r[t]?.type;
  if (e = s === 'Boolean' && typeof e != 'boolean' ? e != null : e, !n || !r[t]) {
    return e;
  }
  if (n === 'toAttribute') {
    switch (s) {
      case 'Object':
      case 'Array':
        return e == null ? null : JSON.stringify(e);
      case 'Boolean':
        return e ? '' : null;
      case 'Number':
        return e ?? null;
      default:
        return e;
    }
  } else {
    switch (s) {
      case 'Object':
      case 'Array':
        return e && JSON.parse(e);
      case 'Boolean':
        return e;
      // conversion already handled above
      case 'Number':
        return e != null ? +e : e;
      default:
        return e;
    }
  }
}
function Ii(t) {
  const e = {};
  return t.childNodes.forEach((r) => {
    e[
      /** @type {Element} node */
      r.slot || 'default'
    ] = !0;
  }), e;
}
function Cr(t, e, r, n, s, i) {
  const a = class extends Zn {
    constructor() {
      super(t, r, s), this.$$p_d = e;
    }

    static get observedAttributes() {
      return be(e).map(
        o => (e[o].attribute || o).toLowerCase(),
      );
    }
  };
  return be(e).forEach((o) => {
    Dt(a.prototype, o, {
      get() {
        return this.$$c && o in this.$$c ? this.$$c[o] : this.$$d[o];
      },
      set(u) {
        u = me(o, u, e), this.$$d[o] = u;
        const l = this.$$c;
        if (l) {
          const c = At(l, o)?.get;
          c ? l[o] = u : l.$set({ [o]: u });
        }
      },
    });
  }), n.forEach((o) => {
    Dt(a.prototype, o, {
      get() {
        return this.$$c?.[o];
      },
    });
  }), t.element /** @type {any} */
    = a, a;
}
const Mi = (t, e, r) => {
  P(e, _(e) + 1), r('countchange', { count: _(e) });
}; const Ni = (t, e, r) => {
  P(e, _(e) - 1), r('countchange', { count: _(e) });
}; const Qi = (t, e, r, n) => {
  P(e, r()), n('countchange', { count: _(e) });
};
const qi = /* @__PURE__ */ Zt('<div class="counter-container svelte-u648ag"><p class="title svelte-u648ag">🎯 Svelte Component in React</p> <div class="count-display svelte-u648ag"> </div> <div class="button-group svelte-u648ag"><button class="svelte-u648ag">-</button> <button class="reset-btn svelte-u648ag">Reset</button> <button class="svelte-u648ag">+</button></div></div>');
const Ui = {
  hash: 'svelte-u648ag',
  code: '.counter-container.svelte-u648ag {padding:20px;border:2px solid #ff3e00;border-radius:8px;background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);color:white;font-family:-apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen, Ubuntu, sans-serif;text-align:center;max-width:300px;margin:0 auto;}.title.svelte-u648ag {margin:0 0 10px 0;font-size:16px;font-weight:600;opacity:0.9;}.count-display.svelte-u648ag {font-size:48px;font-weight:bold;margin:20px 0;text-shadow:2px 2px 4px rgba(0, 0, 0, 0.3);}.button-group.svelte-u648ag {display:flex;gap:10px;justify-content:center;}button.svelte-u648ag {padding:10px 20px;font-size:16px;border:none;border-radius:4px;cursor:pointer;background:white;color:#667eea;font-weight:600;transition:all 0.2s;box-shadow:0 2px 4px rgba(0, 0, 0, 0.1);}button.svelte-u648ag:hover {transform:translateY(-2px);box-shadow:0 4px 8px rgba(0, 0, 0, 0.2);}button.svelte-u648ag:active {transform:translateY(0);}.reset-btn.svelte-u648ag {background:rgba(255, 255, 255, 0.2);color:white;border:1px solid white;}.reset-btn.svelte-u648ag:hover {background:rgba(255, 255, 255, 0.3);}',
};
function ji(t, e) {
  Ne(e, !0), Jn(t, Ui);
  const r = Ce(e, 'initialCount', 7, 0); const n = /* @__PURE__ */ B(mt(r()));
  const s = Yn();
  const i = {
    get initialCount() {
      return r();
    },
    set initialCount(d = 0) {
      r(d), se();
    },
  }; const a = qi(); const o = H(D(a), 2); const u = D(o, !0);
  A(o);
  const l = H(o, 2); const c = D(l);
  c.__click = [Ni, n, s];
  const p = H(c, 2);
  p.__click = [Qi, n, r, s];
  const f = H(p, 2);
  return f.__click = [Mi, n, s], A(l), A(a), re(() => gt(u, _(n))), ct(t, a), Qe(i);
}
Bn(['click']);
customElements.define('svelte-counter', Cr(ji, { initialCount: {} }, [], [], !0));
const ce = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set(), this.subscribe = this.subscribe.bind(this);
  }

  subscribe(t) {
    return this.listeners.add(t), this.onSubscribe(), () => {
      this.listeners.delete(t), this.onUnsubscribe();
    };
  }

  hasListeners() {
    return this.listeners.size > 0;
  }

  onSubscribe() {
  }

  onUnsubscribe() {
  }
}; const Li = {
  // We need the wrapper function syntax below instead of direct references to
  // global setTimeout etc.
  //
  // BAD: `setTimeout: setTimeout`
  // GOOD: `setTimeout: (cb, delay) => setTimeout(cb, delay)`
  //
  // If we use direct references here, then anything that wants to spy on or
  // replace the global setTimeout (like tests) won't work since we'll already
  // have a hard reference to the original implementation at the time when this
  // file was imported.
  setTimeout: (t, e) => setTimeout(t, e),
  clearTimeout: t => clearTimeout(t),
  setInterval: (t, e) => setInterval(t, e),
  clearInterval: t => clearInterval(t),
}; const Ki = class {
  // We cannot have TimeoutManager<T> as we must instantiate it with a concrete
  // type at app boot; and if we leave that type, then any new timer provider
  // would need to support ReturnType<typeof setTimeout>, which is infeasible.
  //
  // We settle for type safety for the TimeoutProvider type, and accept that
  // this class is unsafe internally to allow for extension.
  #e = Li;
  #t = !1;
  setTimeoutProvider(t) {
    process.env.NODE_ENV !== 'production' && this.#t && t !== this.#e && console.error(
      '[timeoutManager]: Switching provider after calls to previous provider might result in unexpected behavior.',
      { previous: this.#e, provider: t },
    ), this.#e = t, process.env.NODE_ENV !== 'production' && (this.#t = !1);
  }

  setTimeout(t, e) {
    return process.env.NODE_ENV !== 'production' && (this.#t = !0), this.#e.setTimeout(t, e);
  }

  clearTimeout(t) {
    this.#e.clearTimeout(t);
  }

  setInterval(t, e) {
    return process.env.NODE_ENV !== 'production' && (this.#t = !0), this.#e.setInterval(t, e);
  }

  clearInterval(t) {
    this.#e.clearInterval(t);
  }
}; const Ft = new Ki();
function Hi(t) {
  setTimeout(t, 0);
}
const Wt = typeof window > 'u' || 'Deno' in globalThis;
function tt() {
}
function Bi(t, e) {
  return typeof t == 'function' ? t(e) : t;
}
function ar(t) {
  return typeof t == 'number' && t >= 0 && t !== 1 / 0;
}
function ts(t, e) {
  return Math.max(t + (e || 0) - Date.now(), 0);
}
function $t(t, e) {
  return typeof t == 'function' ? t(e) : t;
}
function et(t, e) {
  return typeof t == 'function' ? t(e) : t;
}
function Br(t, e) {
  const {
    type: r = 'all',
    exact: n,
    fetchStatus: s,
    predicate: i,
    queryKey: a,
    stale: o,
  } = t;
  if (a) {
    if (n) {
      if (e.queryHash !== Rr(a, e.options)) {
        return !1;
      }
    } else if (!ue(e.queryKey, a)) {
      return !1;
    }
  }
  if (r !== 'all') {
    const u = e.isActive();
    if (r === 'active' && !u || r === 'inactive' && u) {
      return !1;
    }
  }
  return !(typeof o == 'boolean' && e.isStale() !== o || s && s !== e.state.fetchStatus || i && !i(e));
}
function zr(t, e) {
  const { exact: r, status: n, predicate: s, mutationKey: i } = t;
  if (i) {
    if (!e.options.mutationKey) {
      return !1;
    }
    if (r) {
      if (oe(e.options.mutationKey) !== oe(i)) {
        return !1;
      }
    } else if (!ue(e.options.mutationKey, i)) {
      return !1;
    }
  }
  return !(n && e.state.status !== n || s && !s(e));
}
function Rr(t, e) {
  return (e?.queryKeyHashFn || oe)(t);
}
function oe(t) {
  return JSON.stringify(
    t,
    (e, r) => lr(r) ? Object.keys(r).sort().reduce((n, s) => (n[s] = r[s], n), {}) : r,
  );
}
function ue(t, e) {
  return t === e ? !0 : typeof t != typeof e ? !1 : t && e && typeof t == 'object' && typeof e == 'object' ? Object.keys(e).every(r => ue(t[r], e[r])) : !1;
}
const zi = Object.prototype.hasOwnProperty;
function or(t, e) {
  if (t === e) {
    return t;
  }
  const r = Vr(t) && Vr(e);
  if (!r && !(lr(t) && lr(e))) {
    return e;
  }
  const s = (r ? t : Object.keys(t)).length; const i = r ? e : Object.keys(e); const a = i.length; const o = r ? new Array(a) : {};
  let u = 0;
  for (let l = 0; l < a; l++) {
    const c = r ? l : i[l]; const p = t[c]; const f = e[c];
    if (p === f) {
      o[c] = p, (r ? l < s : zi.call(t, c)) && u++;
      continue;
    }
    if (p === null || f === null || typeof p != 'object' || typeof f != 'object') {
      o[c] = f;
      continue;
    }
    const d = or(p, f);
    o[c] = d, d === p && u++;
  }
  return s === a && u === s ? t : o;
}
function ur(t, e) {
  if (!e || Object.keys(t).length !== Object.keys(e).length) {
    return !1;
  }
  for (const r in t) {
    if (t[r] !== e[r]) {
      return !1;
    }
  }
  return !0;
}
function Vr(t) {
  return Array.isArray(t) && t.length === Object.keys(t).length;
}
function lr(t) {
  if (!Gr(t)) {
    return !1;
  }
  const e = t.constructor;
  if (e === void 0) {
    return !0;
  }
  const r = e.prototype;
  return !(!Gr(r) || !r.hasOwnProperty('isPrototypeOf') || Object.getPrototypeOf(t) !== Object.prototype);
}
function Gr(t) {
  return Object.prototype.toString.call(t) === '[object Object]';
}
function Vi(t) {
  return new Promise((e) => {
    Ft.setTimeout(e, t);
  });
}
function cr(t, e, r) {
  if (typeof r.structuralSharing == 'function') {
    return r.structuralSharing(t, e);
  }
  if (r.structuralSharing !== !1) {
    if (process.env.NODE_ENV !== 'production') {
      try {
        return or(t, e);
      } catch (n) {
        throw console.error(
          `Structural sharing requires data to be JSON serializable. To fix this, turn off structuralSharing or return JSON-serializable data from your queryFn. [${r.queryHash}]: ${n}`,
        ), n;
      }
    }
    return or(t, e);
  }
  return e;
}
function Gi(t, e, r = 0) {
  const n = [...t, e];
  return r && n.length > r ? n.slice(1) : n;
}
function Yi(t, e, r = 0) {
  const n = [e, ...t];
  return r && n.length > r ? n.slice(0, -1) : n;
}
const Re = Symbol();
function es(t, e) {
  return process.env.NODE_ENV !== 'production' && t.queryFn === Re && console.error(
    `Attempted to invoke queryFn when set to skipToken. This is likely a configuration error. Query hash: '${t.queryHash}'`,
  ), !t.queryFn && e?.initialPromise ? () => e.initialPromise : !t.queryFn || t.queryFn === Re ? () => Promise.reject(new Error(`Missing queryFn: '${t.queryHash}'`)) : t.queryFn;
}
const Wi = class extends ce {
  #e;
  #t;
  #r;
  constructor() {
    super(), this.#r = (t) => {
      if (!Wt && window.addEventListener) {
        const e = () => t();
        return window.addEventListener('visibilitychange', e, !1), () => {
          window.removeEventListener('visibilitychange', e);
        };
      }
    };
  }

  onSubscribe() {
    this.#t || this.setEventListener(this.#r);
  }

  onUnsubscribe() {
    this.hasListeners() || (this.#t?.(), this.#t = void 0);
  }

  setEventListener(t) {
    this.#r = t, this.#t?.(), this.#t = t((e) => {
      typeof e == 'boolean' ? this.setFocused(e) : this.onFocus();
    });
  }

  setFocused(t) {
    this.#e !== t && (this.#e = t, this.onFocus());
  }

  onFocus() {
    const t = this.isFocused();
    this.listeners.forEach((e) => {
      e(t);
    });
  }

  isFocused() {
    return typeof this.#e == 'boolean' ? this.#e : globalThis.document?.visibilityState !== 'hidden';
  }
}; const Pr = new Wi();
function fr() {
  let t, e;
  const r = new Promise((s, i) => {
    t = s, e = i;
  });
  r.status = 'pending', r.catch(() => {
  });
  function n(s) {
    Object.assign(r, s), delete r.resolve, delete r.reject;
  }
  return r.resolve = (s) => {
    n({
      status: 'fulfilled',
      value: s,
    }), t(s);
  }, r.reject = (s) => {
    n({
      status: 'rejected',
      reason: s,
    }), e(s);
  }, r;
}
const Ji = Hi;
function Xi() {
  let t = []; let e = 0; let r = (o) => {
    o();
  }; let n = (o) => {
    o();
  }; let s = Ji;
  const i = (o) => {
    e
      ? t.push(o)
      : s(() => {
          r(o);
        });
  }; const a = () => {
    const o = t;
    t = [], o.length && s(() => {
      n(() => {
        o.forEach((u) => {
          r(u);
        });
      });
    });
  };
  return {
    batch: (o) => {
      let u;
      e++;
      try {
        u = o();
      } finally {
        e--, e || a();
      }
      return u;
    },
    /**
     * All calls to the wrapped function will be batched.
     */
    batchCalls: o => (...u) => {
      i(() => {
        o(...u);
      });
    },
    schedule: i,
    /**
     * Use this method to set a custom notify function.
     * This can be used to for example wrap notifications with `React.act` while running tests.
     */
    setNotifyFunction: (o) => {
      r = o;
    },
    /**
     * Use this method to set a custom function to batch notifications together into a single tick.
     * By default React Query will use the batch function provided by ReactDOM or React Native.
     */
    setBatchNotifyFunction: (o) => {
      n = o;
    },
    setScheduler: (o) => {
      s = o;
    },
  };
}
const M = Xi(); const Zi = class extends ce {
  #e = !0;
  #t;
  #r;
  constructor() {
    super(), this.#r = (t) => {
      if (!Wt && window.addEventListener) {
        const e = () => t(!0); const r = () => t(!1);
        return window.addEventListener('online', e, !1), window.addEventListener('offline', r, !1), () => {
          window.removeEventListener('online', e), window.removeEventListener('offline', r);
        };
      }
    };
  }

  onSubscribe() {
    this.#t || this.setEventListener(this.#r);
  }

  onUnsubscribe() {
    this.hasListeners() || (this.#t?.(), this.#t = void 0);
  }

  setEventListener(t) {
    this.#r = t, this.#t?.(), this.#t = t(this.setOnline.bind(this));
  }

  setOnline(t) {
    this.#e !== t && (this.#e = t, this.listeners.forEach((r) => {
      r(t);
    }));
  }

  isOnline() {
    return this.#e;
  }
}; const Pe = new Zi();
function ta(t) {
  return Math.min(1e3 * 2 ** t, 3e4);
}
function rs(t) {
  return (t ?? 'online') === 'online' ? Pe.isOnline() : !0;
}
const hr = class extends Error {
  constructor(t) {
    super('CancelledError'), this.revert = t?.revert, this.silent = t?.silent;
  }
};
function ns(t) {
  let e = !1; let r = 0; let n;
  const s = fr(); const i = () => s.status !== 'pending'; const a = (v) => {
    if (!i()) {
      const y = new hr(v);
      f(y), t.onCancel?.(y);
    }
  }; const o = () => {
    e = !0;
  }; const u = () => {
    e = !1;
  }; const l = () => Pr.isFocused() && (t.networkMode === 'always' || Pe.isOnline()) && t.canRun(); const c = () => rs(t.networkMode) && t.canRun(); const p = (v) => {
    i() || (n?.(), s.resolve(v));
  }; const f = (v) => {
    i() || (n?.(), s.reject(v));
  }; const d = () => new Promise((v) => {
    n = (y) => {
      (i() || l()) && v(y);
    }, t.onPause?.();
  }).then(() => {
    n = void 0, i() || t.onContinue?.();
  }); const h = () => {
    if (i()) {
      return;
    }
    let v;
    const y = r === 0 ? t.initialPromise : void 0;
    try {
      v = y ?? t.fn();
    } catch (b) {
      v = Promise.reject(b);
    }
    Promise.resolve(v).then(p).catch((b) => {
      if (i()) {
        return;
      }
      const g = t.retry ?? (Wt ? 0 : 3); const m = t.retryDelay ?? ta; const O = typeof m == 'function' ? m(r, b) : m; const x = g === !0 || typeof g == 'number' && r < g || typeof g == 'function' && g(r, b);
      if (e || !x) {
        f(b);
        return;
      }
      r++, t.onFail?.(r, b), Vi(O).then(() => l() ? void 0 : d()).then(() => {
        e ? f(b) : h();
      });
    });
  };
  return {
    promise: s,
    status: () => s.status,
    cancel: a,
    continue: () => (n?.(), s),
    cancelRetry: o,
    continueRetry: u,
    canStart: c,
    start: () => (c() ? h() : d().then(h), s),
  };
}
const ss = class {
  #e;
  destroy() {
    this.clearGcTimeout();
  }

  scheduleGc() {
    this.clearGcTimeout(), ar(this.gcTime) && (this.#e = Ft.setTimeout(() => {
      this.optionalRemove();
    }, this.gcTime));
  }

  updateGcTime(t) {
    this.gcTime = Math.max(
      this.gcTime || 0,
      t ?? (Wt ? 1 / 0 : 300 * 1e3),
    );
  }

  clearGcTimeout() {
    this.#e && (Ft.clearTimeout(this.#e), this.#e = void 0);
  }
}; const ea = class extends ss {
  #e;
  #t;
  #r;
  #s;
  #n;
  #o;
  #a;
  constructor(t) {
    super(), this.#a = !1, this.#o = t.defaultOptions, this.setOptions(t.options), this.observers = [], this.#s = t.client, this.#r = this.#s.getQueryCache(), this.queryKey = t.queryKey, this.queryHash = t.queryHash, this.#e = Yr(this.options), this.state = t.state ?? this.#e, this.scheduleGc();
  }

  get meta() {
    return this.options.meta;
  }

  get promise() {
    return this.#n?.promise;
  }

  setOptions(t) {
    if (this.options = { ...this.#o, ...t }, this.updateGcTime(this.options.gcTime), this.state && this.state.data === void 0) {
      const e = Yr(this.options);
      e.data !== void 0 && (this.setData(e.data, {
        updatedAt: e.dataUpdatedAt,
        manual: !0,
      }), this.#e = e);
    }
  }

  optionalRemove() {
    !this.observers.length && this.state.fetchStatus === 'idle' && this.#r.remove(this);
  }

  setData(t, e) {
    const r = cr(this.state.data, t, this.options);
    return this.#i({
      data: r,
      type: 'success',
      dataUpdatedAt: e?.updatedAt,
      manual: e?.manual,
    }), r;
  }

  setState(t, e) {
    this.#i({ type: 'setState', state: t, setStateOptions: e });
  }

  cancel(t) {
    const e = this.#n?.promise;
    return this.#n?.cancel(t), e ? e.then(tt).catch(tt) : Promise.resolve();
  }

  destroy() {
    super.destroy(), this.cancel({ silent: !0 });
  }

  reset() {
    this.destroy(), this.setState(this.#e);
  }

  isActive() {
    return this.observers.some(
      t => et(t.options.enabled, this) !== !1,
    );
  }

  isDisabled() {
    return this.getObserversCount() > 0 ? !this.isActive() : this.options.queryFn === Re || this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
  }

  isStatic() {
    return this.getObserversCount() > 0
      ? this.observers.some(
          t => $t(t.options.staleTime, this) === 'static',
        )
      : !1;
  }

  isStale() {
    return this.getObserversCount() > 0
      ? this.observers.some(
          t => t.getCurrentResult().isStale,
        )
      : this.state.data === void 0 || this.state.isInvalidated;
  }

  isStaleByTime(t = 0) {
    return this.state.data === void 0 ? !0 : t === 'static' ? !1 : this.state.isInvalidated ? !0 : !ts(this.state.dataUpdatedAt, t);
  }

  onFocus() {
    this.observers.find(e => e.shouldFetchOnWindowFocus())?.refetch({ cancelRefetch: !1 }), this.#n?.continue();
  }

  onOnline() {
    this.observers.find(e => e.shouldFetchOnReconnect())?.refetch({ cancelRefetch: !1 }), this.#n?.continue();
  }

  addObserver(t) {
    this.observers.includes(t) || (this.observers.push(t), this.clearGcTimeout(), this.#r.notify({ type: 'observerAdded', query: this, observer: t }));
  }

  removeObserver(t) {
    this.observers.includes(t) && (this.observers = this.observers.filter(e => e !== t), this.observers.length || (this.#n && (this.#a ? this.#n.cancel({ revert: !0 }) : this.#n.cancelRetry()), this.scheduleGc()), this.#r.notify({ type: 'observerRemoved', query: this, observer: t }));
  }

  getObserversCount() {
    return this.observers.length;
  }

  invalidate() {
    this.state.isInvalidated || this.#i({ type: 'invalidate' });
  }

  async fetch(t, e) {
    if (this.state.fetchStatus !== 'idle' // If the promise in the retyer is already rejected, we have to definitely
    // re-start the fetch; there is a chance that the query is still in a
    // pending state when that happens
      && this.#n?.status() !== 'rejected') {
      if (this.state.data !== void 0 && e?.cancelRefetch) {
        this.cancel({ silent: !0 });
      } else if (this.#n) {
        return this.#n.continueRetry(), this.#n.promise;
      }
    }
    if (t && this.setOptions(t), !this.options.queryFn) {
      const o = this.observers.find(u => u.options.queryFn);
      o && this.setOptions(o.options);
    }
    process.env.NODE_ENV !== 'production' && (Array.isArray(this.options.queryKey) || console.error(
      'As of v4, queryKey needs to be an Array. If you are using a string like \'repoData\', please change it to an Array, e.g. [\'repoData\']',
    ));
    const r = new AbortController(); const n = (o) => {
      Object.defineProperty(o, 'signal', {
        enumerable: !0,
        get: () => (this.#a = !0, r.signal),
      });
    }; const s = () => {
      const o = es(this.options, e); const l = (() => {
        const c = {
          client: this.#s,
          queryKey: this.queryKey,
          meta: this.meta,
        };
        return n(c), c;
      })();
      return this.#a = !1, this.options.persister
        ? this.options.persister(
            o,
            l,
            this,
          )
        : o(l);
    }; const a = (() => {
      const o = {
        fetchOptions: e,
        options: this.options,
        queryKey: this.queryKey,
        client: this.#s,
        state: this.state,
        fetchFn: s,
      };
      return n(o), o;
    })();
    this.options.behavior?.onFetch(a, this), this.#t = this.state, (this.state.fetchStatus === 'idle' || this.state.fetchMeta !== a.fetchOptions?.meta) && this.#i({ type: 'fetch', meta: a.fetchOptions?.meta }), this.#n = ns({
      initialPromise: e?.initialPromise,
      fn: a.fetchFn,
      onCancel: (o) => {
        o instanceof hr && o.revert && this.setState({
          ...this.#t,
          fetchStatus: 'idle',
        }), r.abort();
      },
      onFail: (o, u) => {
        this.#i({ type: 'failed', failureCount: o, error: u });
      },
      onPause: () => {
        this.#i({ type: 'pause' });
      },
      onContinue: () => {
        this.#i({ type: 'continue' });
      },
      retry: a.options.retry,
      retryDelay: a.options.retryDelay,
      networkMode: a.options.networkMode,
      canRun: () => !0,
    });
    try {
      const o = await this.#n.start();
      if (o === void 0) {
        throw process.env.NODE_ENV !== 'production' && console.error(
          `Query data cannot be undefined. Please make sure to return a value other than undefined from your query function. Affected query key: ${this.queryHash}`,
        ), new Error(`${this.queryHash} data is undefined`);
      }
      return this.setData(o), this.#r.config.onSuccess?.(o, this), this.#r.config.onSettled?.(
        o,
        this.state.error,
        this,
      ), o;
    } catch (o) {
      if (o instanceof hr) {
        if (o.silent) {
          return this.#n.promise;
        }
        if (o.revert) {
          if (this.state.data === void 0) {
            throw o;
          }
          return this.state.data;
        }
      }
      throw this.#i({
        type: 'error',
        error: o,
      }), this.#r.config.onError?.(
        o,
        this,
      ), this.#r.config.onSettled?.(
        this.state.data,
        o,
        this,
      ), o;
    } finally {
      this.scheduleGc();
    }
  }

  #i(t) {
    const e = (r) => {
      switch (t.type) {
        case 'failed':
          return {
            ...r,
            fetchFailureCount: t.failureCount,
            fetchFailureReason: t.error,
          };
        case 'pause':
          return {
            ...r,
            fetchStatus: 'paused',
          };
        case 'continue':
          return {
            ...r,
            fetchStatus: 'fetching',
          };
        case 'fetch':
          return {
            ...r,
            ...is(r.data, this.options),
            fetchMeta: t.meta ?? null,
          };
        case 'success':
          const n = {
            ...r,
            data: t.data,
            dataUpdateCount: r.dataUpdateCount + 1,
            dataUpdatedAt: t.dataUpdatedAt ?? Date.now(),
            error: null,
            isInvalidated: !1,
            status: 'success',
            ...!t.manual && {
              fetchStatus: 'idle',
              fetchFailureCount: 0,
              fetchFailureReason: null,
            },
          };
          return this.#t = t.manual ? n : void 0, n;
        case 'error':
          const s = t.error;
          return {
            ...r,
            error: s,
            errorUpdateCount: r.errorUpdateCount + 1,
            errorUpdatedAt: Date.now(),
            fetchFailureCount: r.fetchFailureCount + 1,
            fetchFailureReason: s,
            fetchStatus: 'idle',
            status: 'error',
          };
        case 'invalidate':
          return {
            ...r,
            isInvalidated: !0,
          };
        case 'setState':
          return {
            ...r,
            ...t.state,
          };
      }
    };
    this.state = e(this.state), M.batch(() => {
      this.observers.forEach((r) => {
        r.onQueryUpdate();
      }), this.#r.notify({ query: this, type: 'updated', action: t });
    });
  }
};
function is(t, e) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: rs(e.networkMode) ? 'fetching' : 'paused',
    ...t === void 0 && {
      error: null,
      status: 'pending',
    },
  };
}
function Yr(t) {
  const e = typeof t.initialData == 'function' ? t.initialData() : t.initialData; const r = e !== void 0; const n = r ? typeof t.initialDataUpdatedAt == 'function' ? t.initialDataUpdatedAt() : t.initialDataUpdatedAt : 0;
  return {
    data: e,
    dataUpdateCount: 0,
    dataUpdatedAt: r ? n ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: r ? 'success' : 'pending',
    fetchStatus: 'idle',
  };
}
const ra = class extends ce {
  constructor(t, e) {
    super(), this.options = e, this.#e = t, this.#i = null, this.#a = fr(), this.bindMethods(), this.setOptions(e);
  }

  #e;
  #t = void 0;
  #r = void 0;
  #s = void 0;
  #n;
  #o;
  #a;
  #i;
  #u;
  #c;
  // This property keeps track of the last query with defined data.
  // It will be used to pass the previous data and query to the placeholder function between renders.
  #f;
  #l;
  #d;
  #h;
  #_ = /* @__PURE__ */ new Set();
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }

  onSubscribe() {
    this.listeners.size === 1 && (this.#t.addObserver(this), Wr(this.#t, this.options) ? this.#v() : this.updateResult(), this.#y());
  }

  onUnsubscribe() {
    this.hasListeners() || this.destroy();
  }

  shouldFetchOnReconnect() {
    return dr(
      this.#t,
      this.options,
      this.options.refetchOnReconnect,
    );
  }

  shouldFetchOnWindowFocus() {
    return dr(
      this.#t,
      this.options,
      this.options.refetchOnWindowFocus,
    );
  }

  destroy() {
    this.listeners = /* @__PURE__ */ new Set(), this.#g(), this.#w(), this.#t.removeObserver(this);
  }

  setOptions(t) {
    const e = this.options; const r = this.#t;
    if (this.options = this.#e.defaultQueryOptions(t), this.options.enabled !== void 0 && typeof this.options.enabled != 'boolean' && typeof this.options.enabled != 'function' && typeof et(this.options.enabled, this.#t) != 'boolean') {
      throw new Error(
        'Expected enabled to be a boolean or a callback that returns a boolean',
      );
    }
    this.#E(), this.#t.setOptions(this.options), e._defaulted && !ur(this.options, e) && this.#e.getQueryCache().notify({
      type: 'observerOptionsUpdated',
      query: this.#t,
      observer: this,
    });
    const n = this.hasListeners();
    n && Jr(
      this.#t,
      r,
      this.options,
      e,
    ) && this.#v(), this.updateResult(), n && (this.#t !== r || et(this.options.enabled, this.#t) !== et(e.enabled, this.#t) || $t(this.options.staleTime, this.#t) !== $t(e.staleTime, this.#t)) && this.#m();
    const s = this.#b();
    n && (this.#t !== r || et(this.options.enabled, this.#t) !== et(e.enabled, this.#t) || s !== this.#h) && this.#p(s);
  }

  getOptimisticResult(t) {
    const e = this.#e.getQueryCache().build(this.#e, t); const r = this.createResult(e, t);
    return sa(this, r) && (this.#s = r, this.#o = this.options, this.#n = this.#t.state), r;
  }

  getCurrentResult() {
    return this.#s;
  }

  trackResult(t, e) {
    return new Proxy(t, {
      get: (r, n) => (this.trackProp(n), e?.(n), n === 'promise' && (this.trackProp('data'), !this.options.experimental_prefetchInRender && this.#a.status === 'pending' && this.#a.reject(
        new Error(
          'experimental_prefetchInRender feature flag is not enabled',
        ),
      )), Reflect.get(r, n)),
    });
  }

  trackProp(t) {
    this.#_.add(t);
  }

  getCurrentQuery() {
    return this.#t;
  }

  refetch({ ...t } = {}) {
    return this.fetch({
      ...t,
    });
  }

  fetchOptimistic(t) {
    const e = this.#e.defaultQueryOptions(t); const r = this.#e.getQueryCache().build(this.#e, e);
    return r.fetch().then(() => this.createResult(r, e));
  }

  fetch(t) {
    return this.#v({
      ...t,
      cancelRefetch: t.cancelRefetch ?? !0,
    }).then(() => (this.updateResult(), this.#s));
  }

  #v(t) {
    this.#E();
    let e = this.#t.fetch(
      this.options,
      t,
    );
    return t?.throwOnError || (e = e.catch(tt)), e;
  }

  #m() {
    this.#g();
    const t = $t(
      this.options.staleTime,
      this.#t,
    );
    if (Wt || this.#s.isStale || !ar(t)) {
      return;
    }
    const r = ts(this.#s.dataUpdatedAt, t) + 1;
    this.#l = Ft.setTimeout(() => {
      this.#s.isStale || this.updateResult();
    }, r);
  }

  #b() {
    return (typeof this.options.refetchInterval == 'function' ? this.options.refetchInterval(this.#t) : this.options.refetchInterval) ?? !1;
  }

  #p(t) {
    this.#w(), this.#h = t, !(Wt || et(this.options.enabled, this.#t) === !1 || !ar(this.#h) || this.#h === 0) && (this.#d = Ft.setInterval(() => {
      (this.options.refetchIntervalInBackground || Pr.isFocused()) && this.#v();
    }, this.#h));
  }

  #y() {
    this.#m(), this.#p(this.#b());
  }

  #g() {
    this.#l && (Ft.clearTimeout(this.#l), this.#l = void 0);
  }

  #w() {
    this.#d && (Ft.clearInterval(this.#d), this.#d = void 0);
  }

  createResult(t, e) {
    const r = this.#t; const n = this.options; const s = this.#s; const i = this.#n; const a = this.#o; const u = t !== r ? t.state : this.#r; const { state: l } = t;
    let c = { ...l }; let p = !1; let f;
    if (e._optimisticResults) {
      const R = this.hasListeners(); const F = !R && Wr(t, e); const K = R && Jr(t, r, e, n);
      (F || K) && (c = {
        ...c,
        ...is(l.data, t.options),
      }), e._optimisticResults === 'isRestoring' && (c.fetchStatus = 'idle');
    }
    let { error: d, errorUpdatedAt: h, status: v } = c;
    f = c.data;
    let y = !1;
    if (e.placeholderData !== void 0 && f === void 0 && v === 'pending') {
      let R;
      s?.isPlaceholderData && e.placeholderData === a?.placeholderData
        ? (R = s.data, y = !0)
        : R = typeof e.placeholderData == 'function'
          ? e.placeholderData(
              this.#f?.state.data,
              this.#f,
            )
          : e.placeholderData, R !== void 0 && (v = 'success', f = cr(
        s?.data,
        R,
        e,
      ), p = !0);
    }
    if (e.select && f !== void 0 && !y) {
      if (s && f === i?.data && e.select === this.#u) {
        f = this.#c;
      } else {
        try {
          this.#u = e.select, f = e.select(f), f = cr(s?.data, f, e), this.#c = f, this.#i = null;
        } catch (R) {
          this.#i = R;
        }
      }
    }
    this.#i && (d = this.#i, f = this.#c, h = Date.now(), v = 'error');
    const b = c.fetchStatus === 'fetching'; const g = v === 'pending'; const m = v === 'error'; const O = g && b; const x = f !== void 0; const C = {
      status: v,
      fetchStatus: c.fetchStatus,
      isPending: g,
      isSuccess: v === 'success',
      isError: m,
      isInitialLoading: O,
      isLoading: O,
      data: f,
      dataUpdatedAt: c.dataUpdatedAt,
      error: d,
      errorUpdatedAt: h,
      failureCount: c.fetchFailureCount,
      failureReason: c.fetchFailureReason,
      errorUpdateCount: c.errorUpdateCount,
      isFetched: c.dataUpdateCount > 0 || c.errorUpdateCount > 0,
      isFetchedAfterMount: c.dataUpdateCount > u.dataUpdateCount || c.errorUpdateCount > u.errorUpdateCount,
      isFetching: b,
      isRefetching: b && !g,
      isLoadingError: m && !x,
      isPaused: c.fetchStatus === 'paused',
      isPlaceholderData: p,
      isRefetchError: m && x,
      isStale: Tr(t, e),
      refetch: this.refetch,
      promise: this.#a,
      isEnabled: et(e.enabled, t) !== !1,
    };
    if (this.options.experimental_prefetchInRender) {
      const R = (J) => {
        C.status === 'error' ? J.reject(C.error) : C.data !== void 0 && J.resolve(C.data);
      }; const F = () => {
        const J = this.#a = C.promise = fr();
        R(J);
      }; const K = this.#a;
      switch (K.status) {
        case 'pending':
          t.queryHash === r.queryHash && R(K);
          break;
        case 'fulfilled':
          (C.status === 'error' || C.data !== K.value) && F();
          break;
        case 'rejected':
          (C.status !== 'error' || C.error !== K.reason) && F();
          break;
      }
    }
    return C;
  }

  updateResult() {
    const t = this.#s; const e = this.createResult(this.#t, this.options);
    if (this.#n = this.#t.state, this.#o = this.options, this.#n.data !== void 0 && (this.#f = this.#t), ur(e, t)) {
      return;
    }
    this.#s = e;
    const r = () => {
      if (!t) {
        return !0;
      }
      const { notifyOnChangeProps: n } = this.options; const s = typeof n == 'function' ? n() : n;
      if (s === 'all' || !s && !this.#_.size) {
        return !0;
      }
      const i = new Set(
        s ?? this.#_,
      );
      return this.options.throwOnError && i.add('error'), Object.keys(this.#s).some((a) => {
        const o = a;
        return this.#s[o] !== t[o] && i.has(o);
      });
    };
    this.#$({ listeners: r() });
  }

  #E() {
    const t = this.#e.getQueryCache().build(this.#e, this.options);
    if (t === this.#t) {
      return;
    }
    const e = this.#t;
    this.#t = t, this.#r = t.state, this.hasListeners() && (e?.removeObserver(this), t.addObserver(this));
  }

  onQueryUpdate() {
    this.updateResult(), this.hasListeners() && this.#y();
  }

  #$(t) {
    M.batch(() => {
      t.listeners && this.listeners.forEach((e) => {
        e(this.#s);
      }), this.#e.getQueryCache().notify({
        query: this.#t,
        type: 'observerResultsUpdated',
      });
    });
  }
};
function na(t, e) {
  return et(e.enabled, t) !== !1 && t.state.data === void 0 && !(t.state.status === 'error' && e.retryOnMount === !1);
}
function Wr(t, e) {
  return na(t, e) || t.state.data !== void 0 && dr(t, e, e.refetchOnMount);
}
function dr(t, e, r) {
  if (et(e.enabled, t) !== !1 && $t(e.staleTime, t) !== 'static') {
    const n = typeof r == 'function' ? r(t) : r;
    return n === 'always' || n !== !1 && Tr(t, e);
  }
  return !1;
}
function Jr(t, e, r, n) {
  return (t !== e || et(n.enabled, t) === !1) && (!r.suspense || t.state.status !== 'error') && Tr(t, r);
}
function Tr(t, e) {
  return et(e.enabled, t) !== !1 && t.isStaleByTime($t(e.staleTime, t));
}
function sa(t, e) {
  return !ur(t.getCurrentResult(), e);
}
function Xr(t) {
  return {
    onFetch: (e, r) => {
      const n = e.options; const s = e.fetchOptions?.meta?.fetchMore?.direction; const i = e.state.data?.pages || []; const a = e.state.data?.pageParams || [];
      let o = { pages: [], pageParams: [] }; let u = 0;
      const l = async () => {
        let c = !1;
        const p = (h) => {
          Object.defineProperty(h, 'signal', {
            enumerable: !0,
            get: () => (e.signal.aborted
              ? c = !0
              : e.signal.addEventListener('abort', () => {
                  c = !0;
                }), e.signal),
          });
        }; const f = es(e.options, e.fetchOptions); const d = async (h, v, y) => {
          if (c) {
            return Promise.reject();
          }
          if (v == null && h.pages.length) {
            return Promise.resolve(h);
          }
          const g = (() => {
            const N = {
              client: e.client,
              queryKey: e.queryKey,
              pageParam: v,
              direction: y ? 'backward' : 'forward',
              meta: e.options.meta,
            };
            return p(N), N;
          })(); const m = await f(g); const { maxPages: O } = e.options; const x = y ? Yi : Gi;
          return {
            pages: x(h.pages, m, O),
            pageParams: x(h.pageParams, v, O),
          };
        };
        if (s && i.length) {
          const h = s === 'backward'; const v = h ? ia : Zr; const y = {
            pages: i,
            pageParams: a,
          }; const b = v(n, y);
          o = await d(y, b, h);
        } else {
          const h = t ?? i.length;
          do {
            const v = u === 0 ? a[0] ?? n.initialPageParam : Zr(n, o);
            if (u > 0 && v == null) {
              break;
            }
            o = await d(o, v), u++;
          } while (u < h);
        }
        return o;
      };
      e.options.persister
        ? e.fetchFn = () => e.options.persister?.(
          l,
          {
            client: e.client,
            queryKey: e.queryKey,
            meta: e.options.meta,
            signal: e.signal,
          },
          r,
        )
        : e.fetchFn = l;
    },
  };
}
function Zr(t, { pages: e, pageParams: r }) {
  const n = e.length - 1;
  return e.length > 0
    ? t.getNextPageParam(
        e[n],
        e,
        r[n],
        r,
      )
    : void 0;
}
function ia(t, { pages: e, pageParams: r }) {
  return e.length > 0 ? t.getPreviousPageParam?.(e[0], e, r[0], r) : void 0;
}
const aa = class extends ss {
  #e;
  #t;
  #r;
  #s;
  constructor(t) {
    super(), this.#e = t.client, this.mutationId = t.mutationId, this.#r = t.mutationCache, this.#t = [], this.state = t.state || oa(), this.setOptions(t.options), this.scheduleGc();
  }

  setOptions(t) {
    this.options = t, this.updateGcTime(this.options.gcTime);
  }

  get meta() {
    return this.options.meta;
  }

  addObserver(t) {
    this.#t.includes(t) || (this.#t.push(t), this.clearGcTimeout(), this.#r.notify({
      type: 'observerAdded',
      mutation: this,
      observer: t,
    }));
  }

  removeObserver(t) {
    this.#t = this.#t.filter(e => e !== t), this.scheduleGc(), this.#r.notify({
      type: 'observerRemoved',
      mutation: this,
      observer: t,
    });
  }

  optionalRemove() {
    this.#t.length || (this.state.status === 'pending' ? this.scheduleGc() : this.#r.remove(this));
  }

  continue() {
    return this.#s?.continue() // continuing a mutation assumes that variables are set, mutation must have been dehydrated before
      ?? this.execute(this.state.variables);
  }

  async execute(t) {
    const e = () => {
      this.#n({ type: 'continue' });
    }; const r = {
      client: this.#e,
      meta: this.options.meta,
      mutationKey: this.options.mutationKey,
    };
    this.#s = ns({
      fn: () => this.options.mutationFn ? this.options.mutationFn(t, r) : Promise.reject(new Error('No mutationFn found')),
      onFail: (i, a) => {
        this.#n({ type: 'failed', failureCount: i, error: a });
      },
      onPause: () => {
        this.#n({ type: 'pause' });
      },
      onContinue: e,
      retry: this.options.retry ?? 0,
      retryDelay: this.options.retryDelay,
      networkMode: this.options.networkMode,
      canRun: () => this.#r.canRun(this),
    });
    const n = this.state.status === 'pending'; const s = !this.#s.canStart();
    try {
      if (n) {
        e();
      } else {
        this.#n({ type: 'pending', variables: t, isPaused: s }), await this.#r.config.onMutate?.(
          t,
          this,
          r,
        );
        const a = await this.options.onMutate?.(
          t,
          r,
        );
        a !== this.state.context && this.#n({
          type: 'pending',
          context: a,
          variables: t,
          isPaused: s,
        });
      }
      const i = await this.#s.start();
      return await this.#r.config.onSuccess?.(
        i,
        t,
        this.state.context,
        this,
        r,
      ), await this.options.onSuccess?.(
        i,
        t,
        this.state.context,
        r,
      ), await this.#r.config.onSettled?.(
        i,
        null,
        this.state.variables,
        this.state.context,
        this,
        r,
      ), await this.options.onSettled?.(
        i,
        null,
        t,
        this.state.context,
        r,
      ), this.#n({ type: 'success', data: i }), i;
    } catch (i) {
      try {
        throw await this.#r.config.onError?.(
          i,
          t,
          this.state.context,
          this,
          r,
        ), await this.options.onError?.(
          i,
          t,
          this.state.context,
          r,
        ), await this.#r.config.onSettled?.(
          void 0,
          i,
          this.state.variables,
          this.state.context,
          this,
          r,
        ), await this.options.onSettled?.(
          void 0,
          i,
          t,
          this.state.context,
          r,
        ), i;
      } finally {
        this.#n({ type: 'error', error: i });
      }
    } finally {
      this.#r.runNext(this);
    }
  }

  #n(t) {
    const e = (r) => {
      switch (t.type) {
        case 'failed':
          return {
            ...r,
            failureCount: t.failureCount,
            failureReason: t.error,
          };
        case 'pause':
          return {
            ...r,
            isPaused: !0,
          };
        case 'continue':
          return {
            ...r,
            isPaused: !1,
          };
        case 'pending':
          return {
            ...r,
            context: t.context,
            data: void 0,
            failureCount: 0,
            failureReason: null,
            error: null,
            isPaused: t.isPaused,
            status: 'pending',
            variables: t.variables,
            submittedAt: Date.now(),
          };
        case 'success':
          return {
            ...r,
            data: t.data,
            failureCount: 0,
            failureReason: null,
            error: null,
            status: 'success',
            isPaused: !1,
          };
        case 'error':
          return {
            ...r,
            data: void 0,
            error: t.error,
            failureCount: r.failureCount + 1,
            failureReason: t.error,
            isPaused: !1,
            status: 'error',
          };
      }
    };
    this.state = e(this.state), M.batch(() => {
      this.#t.forEach((r) => {
        r.onMutationUpdate(t);
      }), this.#r.notify({
        mutation: this,
        type: 'updated',
        action: t,
      });
    });
  }
};
function oa() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: 'idle',
    variables: void 0,
    submittedAt: 0,
  };
}
const ua = class extends ce {
  constructor(t = {}) {
    super(), this.config = t, this.#e = /* @__PURE__ */ new Set(), this.#t = /* @__PURE__ */ new Map(), this.#r = 0;
  }

  #e;
  #t;
  #r;
  build(t, e, r) {
    const n = new aa({
      client: t,
      mutationCache: this,
      mutationId: ++this.#r,
      options: t.defaultMutationOptions(e),
      state: r,
    });
    return this.add(n), n;
  }

  add(t) {
    this.#e.add(t);
    const e = _e(t);
    if (typeof e == 'string') {
      const r = this.#t.get(e);
      r ? r.push(t) : this.#t.set(e, [t]);
    }
    this.notify({ type: 'added', mutation: t });
  }

  remove(t) {
    if (this.#e.delete(t)) {
      const e = _e(t);
      if (typeof e == 'string') {
        const r = this.#t.get(e);
        if (r) {
          if (r.length > 1) {
            const n = r.indexOf(t);
            n !== -1 && r.splice(n, 1);
          } else {
            r[0] === t && this.#t.delete(e);
          }
        }
      }
    }
    this.notify({ type: 'removed', mutation: t });
  }

  canRun(t) {
    const e = _e(t);
    if (typeof e == 'string') {
      const n = this.#t.get(e)?.find(
        s => s.state.status === 'pending',
      );
      return !n || n === t;
    } else {
      return !0;
    }
  }

  runNext(t) {
    const e = _e(t);
    return typeof e == 'string' ? this.#t.get(e)?.find(n => n !== t && n.state.isPaused)?.continue() ?? Promise.resolve() : Promise.resolve();
  }

  clear() {
    M.batch(() => {
      this.#e.forEach((t) => {
        this.notify({ type: 'removed', mutation: t });
      }), this.#e.clear(), this.#t.clear();
    });
  }

  getAll() {
    return Array.from(this.#e);
  }

  find(t) {
    const e = { exact: !0, ...t };
    return this.getAll().find(
      r => zr(e, r),
    );
  }

  findAll(t = {}) {
    return this.getAll().filter(e => zr(t, e));
  }

  notify(t) {
    M.batch(() => {
      this.listeners.forEach((e) => {
        e(t);
      });
    });
  }

  resumePausedMutations() {
    const t = this.getAll().filter(e => e.state.isPaused);
    return M.batch(
      () => Promise.all(
        t.map(e => e.continue().catch(tt)),
      ),
    );
  }
};
function _e(t) {
  return t.options.scope?.id;
}
const la = class extends ce {
  constructor(t = {}) {
    super(), this.config = t, this.#e = /* @__PURE__ */ new Map();
  }

  #e;
  build(t, e, r) {
    const n = e.queryKey; const s = e.queryHash ?? Rr(n, e);
    let i = this.get(s);
    return i || (i = new ea({
      client: t,
      queryKey: n,
      queryHash: s,
      options: t.defaultQueryOptions(e),
      state: r,
      defaultOptions: t.getQueryDefaults(n),
    }), this.add(i)), i;
  }

  add(t) {
    this.#e.has(t.queryHash) || (this.#e.set(t.queryHash, t), this.notify({
      type: 'added',
      query: t,
    }));
  }

  remove(t) {
    const e = this.#e.get(t.queryHash);
    e && (t.destroy(), e === t && this.#e.delete(t.queryHash), this.notify({ type: 'removed', query: t }));
  }

  clear() {
    M.batch(() => {
      this.getAll().forEach((t) => {
        this.remove(t);
      });
    });
  }

  get(t) {
    return this.#e.get(t);
  }

  getAll() {
    return [...this.#e.values()];
  }

  find(t) {
    const e = { exact: !0, ...t };
    return this.getAll().find(
      r => Br(e, r),
    );
  }

  findAll(t = {}) {
    const e = this.getAll();
    return Object.keys(t).length > 0 ? e.filter(r => Br(t, r)) : e;
  }

  notify(t) {
    M.batch(() => {
      this.listeners.forEach((e) => {
        e(t);
      });
    });
  }

  onFocus() {
    M.batch(() => {
      this.getAll().forEach((t) => {
        t.onFocus();
      });
    });
  }

  onOnline() {
    M.batch(() => {
      this.getAll().forEach((t) => {
        t.onOnline();
      });
    });
  }
}; const vr = class {
  #e;
  #t;
  #r;
  #s;
  #n;
  #o;
  #a;
  #i;
  constructor(t = {}) {
    this.#e = t.queryCache || new la(), this.#t = t.mutationCache || new ua(), this.#r = t.defaultOptions || {}, this.#s = /* @__PURE__ */ new Map(), this.#n = /* @__PURE__ */ new Map(), this.#o = 0;
  }

  mount() {
    this.#o++, this.#o === 1 && (this.#a = Pr.subscribe(async (t) => {
      t && (await this.resumePausedMutations(), this.#e.onFocus());
    }), this.#i = Pe.subscribe(async (t) => {
      t && (await this.resumePausedMutations(), this.#e.onOnline());
    }));
  }

  unmount() {
    this.#o--, this.#o === 0 && (this.#a?.(), this.#a = void 0, this.#i?.(), this.#i = void 0);
  }

  isFetching(t) {
    return this.#e.findAll({ ...t, fetchStatus: 'fetching' }).length;
  }

  isMutating(t) {
    return this.#t.findAll({ ...t, status: 'pending' }).length;
  }

  /**
   * Imperative (non-reactive) way to retrieve data for a QueryKey.
   * Should only be used in callbacks or functions where reading the latest data is necessary, e.g. for optimistic updates.
   *
   * Hint: Do not use this function inside a component, because it won't receive updates.
   * Use `useQuery` to create a `QueryObserver` that subscribes to changes.
   */
  getQueryData(t) {
    const e = this.defaultQueryOptions({ queryKey: t });
    return this.#e.get(e.queryHash)?.state.data;
  }

  ensureQueryData(t) {
    const e = this.defaultQueryOptions(t); const r = this.#e.build(this, e); const n = r.state.data;
    return n === void 0 ? this.fetchQuery(t) : (t.revalidateIfStale && r.isStaleByTime($t(e.staleTime, r)) && this.prefetchQuery(e), Promise.resolve(n));
  }

  getQueriesData(t) {
    return this.#e.findAll(t).map(({ queryKey: e, state: r }) => {
      const n = r.data;
      return [e, n];
    });
  }

  setQueryData(t, e, r) {
    const n = this.defaultQueryOptions({ queryKey: t }); const i = this.#e.get(
      n.queryHash,
    )?.state.data; const a = Bi(e, i);
    if (a !== void 0) {
      return this.#e.build(this, n).setData(a, { ...r, manual: !0 });
    }
  }

  setQueriesData(t, e, r) {
    return M.batch(
      () => this.#e.findAll(t).map(({ queryKey: n }) => [
        n,
        this.setQueryData(n, e, r),
      ]),
    );
  }

  getQueryState(t) {
    const e = this.defaultQueryOptions({ queryKey: t });
    return this.#e.get(
      e.queryHash,
    )?.state;
  }

  removeQueries(t) {
    const e = this.#e;
    M.batch(() => {
      e.findAll(t).forEach((r) => {
        e.remove(r);
      });
    });
  }

  resetQueries(t, e) {
    const r = this.#e;
    return M.batch(() => (r.findAll(t).forEach((n) => {
      n.reset();
    }), this.refetchQueries(
      {
        type: 'active',
        ...t,
      },
      e,
    )));
  }

  cancelQueries(t, e = {}) {
    const r = { revert: !0, ...e }; const n = M.batch(
      () => this.#e.findAll(t).map(s => s.cancel(r)),
    );
    return Promise.all(n).then(tt).catch(tt);
  }

  invalidateQueries(t, e = {}) {
    return M.batch(() => (this.#e.findAll(t).forEach((r) => {
      r.invalidate();
    }), t?.refetchType === 'none'
      ? Promise.resolve()
      : this.refetchQueries(
          {
            ...t,
            type: t?.refetchType ?? t?.type ?? 'active',
          },
          e,
        )));
  }

  refetchQueries(t, e = {}) {
    const r = {
      ...e,
      cancelRefetch: e.cancelRefetch ?? !0,
    }; const n = M.batch(
      () => this.#e.findAll(t).filter(s => !s.isDisabled() && !s.isStatic()).map((s) => {
        let i = s.fetch(void 0, r);
        return r.throwOnError || (i = i.catch(tt)), s.state.fetchStatus === 'paused' ? Promise.resolve() : i;
      }),
    );
    return Promise.all(n).then(tt);
  }

  fetchQuery(t) {
    const e = this.defaultQueryOptions(t);
    e.retry === void 0 && (e.retry = !1);
    const r = this.#e.build(this, e);
    return r.isStaleByTime(
      $t(e.staleTime, r),
    )
      ? r.fetch(e)
      : Promise.resolve(r.state.data);
  }

  prefetchQuery(t) {
    return this.fetchQuery(t).then(tt).catch(tt);
  }

  fetchInfiniteQuery(t) {
    return t.behavior = Xr(t.pages), this.fetchQuery(t);
  }

  prefetchInfiniteQuery(t) {
    return this.fetchInfiniteQuery(t).then(tt).catch(tt);
  }

  ensureInfiniteQueryData(t) {
    return t.behavior = Xr(t.pages), this.ensureQueryData(t);
  }

  resumePausedMutations() {
    return Pe.isOnline() ? this.#t.resumePausedMutations() : Promise.resolve();
  }

  getQueryCache() {
    return this.#e;
  }

  getMutationCache() {
    return this.#t;
  }

  getDefaultOptions() {
    return this.#r;
  }

  setDefaultOptions(t) {
    this.#r = t;
  }

  setQueryDefaults(t, e) {
    this.#s.set(oe(t), {
      queryKey: t,
      defaultOptions: e,
    });
  }

  getQueryDefaults(t) {
    const e = [...this.#s.values()]; const r = {};
    return e.forEach((n) => {
      ue(t, n.queryKey) && Object.assign(r, n.defaultOptions);
    }), r;
  }

  setMutationDefaults(t, e) {
    this.#n.set(oe(t), {
      mutationKey: t,
      defaultOptions: e,
    });
  }

  getMutationDefaults(t) {
    const e = [...this.#n.values()]; const r = {};
    return e.forEach((n) => {
      ue(t, n.mutationKey) && Object.assign(r, n.defaultOptions);
    }), r;
  }

  defaultQueryOptions(t) {
    if (t._defaulted) {
      return t;
    }
    const e = {
      ...this.#r.queries,
      ...this.getQueryDefaults(t.queryKey),
      ...t,
      _defaulted: !0,
    };
    return e.queryHash || (e.queryHash = Rr(
      e.queryKey,
      e,
    )), e.refetchOnReconnect === void 0 && (e.refetchOnReconnect = e.networkMode !== 'always'), e.throwOnError === void 0 && (e.throwOnError = !!e.suspense), !e.networkMode && e.persister && (e.networkMode = 'offlineFirst'), e.queryFn === Re && (e.enabled = !1), e;
  }

  defaultMutationOptions(t) {
    return t?._defaulted
      ? t
      : {
          ...this.#r.mutations,
          ...t?.mutationKey && this.getMutationDefaults(t.mutationKey),
          ...t,
          _defaulted: !0,
        };
  }

  clear() {
    this.#e.clear(), this.#t.clear();
  }
};
const as = Symbol('QueryClient'); const ca = () => {
  const t = cn(as);
  if (!t) {
    throw new Error('No QueryClient was found in Svelte context. Did you forget to wrap your component with QueryClientProvider?');
  }
  return t;
}; const fa = (t) => {
  Bs(as, t);
}; const ha = Symbol('isRestoring'); const da = () => {
  try {
    return cn(ha) ?? { current: !1 };
  } catch {
    return { current: !1 };
  }
};
function va() {
  return da();
}
function pa(t) {
  return ca();
}
const ya = ['forEach', 'isDisjointFrom', 'isSubsetOf', 'isSupersetOf']; const _a = ['difference', 'intersection', 'symmetricDifference', 'union']; let tn = !1;
class Te extends Set {
  /** @type {Map<T, Source<boolean>>} */
  #e = /* @__PURE__ */ new Map();
  #t = /* @__PURE__ */ B(0);
  #r = /* @__PURE__ */ B(0);
  #s = pt || -1;
  /**
   * @param {Iterable<T> | null | undefined} [value]
   */
  constructor(e) {
    if (super(), e) {
      for (const r of e) {
        super.add(r);
      }
      this.#r.v = super.size;
    }
    tn || this.#o();
  }

  /**
   * If the source is being created inside the same reaction as the SvelteSet instance,
   * we use `state` so that it will not be a dependency of the reaction. Otherwise we
   * use `source` so it will be.
   *
   * @template T
   * @param {T} value
   * @returns {Source<T>}
   */
  #n(e) {
    return pt === this.#s ? /* @__PURE__ */ B(e) : xt(e);
  }

  // We init as part of the first instance so that we can treeshake this class
  #o() {
    tn = !0;
    const e = Te.prototype; const r = Set.prototype;
    for (const n of ya) {
      e[n] = function (...s) {
        return _(this.#t), r[n].apply(this, s);
      };
    }
    for (const n of _a) {
      e[n] = function (...s) {
        _(this.#t);
        const i = (
        /** @type {Set<T>} */
          r[n].apply(this, s)
        );
        return new Te(i);
      };
    }
  }

  /** @param {T} value */
  has(e) {
    const r = super.has(e); const n = this.#e; let s = n.get(e);
    if (s === void 0) {
      if (!r) {
        return _(this.#t), !1;
      }
      s = this.#n(!0), n.set(e, s);
    }
    return _(s), r;
  }

  /** @param {T} value */
  add(e) {
    return super.has(e) || (super.add(e), P(this.#r, super.size), Et(this.#t)), this;
  }

  /** @param {T} value */
  delete(e) {
    const r = super.delete(e); const n = this.#e; const s = n.get(e);
    return s !== void 0 && (n.delete(e), P(s, !1)), r && (P(this.#r, super.size), Et(this.#t)), r;
  }

  clear() {
    if (super.size !== 0) {
      super.clear();
      const e = this.#e;
      for (const r of e.values()) {
        P(r, !1);
      }
      e.clear(), P(this.#r, 0), Et(this.#t);
    }
  }

  keys() {
    return this.values();
  }

  values() {
    return _(this.#t), super.values();
  }

  entries() {
    return _(this.#t), super.entries();
  }

  [Symbol.iterator]() {
    return this.keys();
  }

  get size() {
    return _(this.#r);
  }
}
function ga(t) {
  const e = Array.isArray(t) ? [] : {}; const r = new Te(); const n = new Proxy(e, {
    set(i, a, o, u) {
      if (r.delete(a), a in i) {
        return Reflect.set(i, a, o, u);
      }
      const l = /* @__PURE__ */ B(o);
      return Object.defineProperty(i, a, {
        configurable: !0,
        enumerable: !0,
        get: () => _(l) && ba(_(l)) ? _(l)() : _(l),
        set: (c) => {
          P(l, c);
        },
      }), !0;
    },
    has: (i, a) => r.has(a) ? !1 : a in i,
    ownKeys(i) {
      return Reflect.ownKeys(i).filter(a => !r.has(a));
    },
    getOwnPropertyDescriptor(i, a) {
      if (!r.has(a)) {
        return Reflect.getOwnPropertyDescriptor(i, a);
      }
    },
    deleteProperty(i, a) {
      return a in i ? (i[a] = void 0, r.add(a), Array.isArray(i) && i.length--, !0) : !1;
    },
  });
  function s(i) {
    const a = Object.keys(n); const o = Object.keys(i); const u = a.filter(l => !o.includes(l));
    for (const l of u) {
      delete n[l];
    }
    for (const l of o) {
      n[l] = ma(() => i[l]);
    }
  }
  return s(t), [n, s];
}
const os = Symbol('LazyValue');
function ma(t) {
  return t[os] = !0, t;
}
function ba(t) {
  return !!t[os];
}
function wa(t, e) {
  switch (t) {
    case 'post':
      xr(e);
      break;
    case 'pre':
      oi(e);
      break;
  }
}
const Ye = (t, e, r) => {
  let n = !1; let s = Array.isArray(t) ? [] : void 0;
  wa(e, () => {
    const i = Array.isArray(t) ? t.map(o => o()) : t();
    if (!n) {
      n = !0, s = i;
      return;
    }
    const a = Xt(() => r(i, s));
    return s = i, a;
  });
};
function Ea(t, e, r) {
  const n = /* @__PURE__ */ qr(() => pa()); const s = va(); const i = /* @__PURE__ */ qr(() => {
    const c = _(n).defaultQueryOptions(t());
    return c._optimisticResults = s.current ? 'isRestoring' : 'optimistic', c;
  });
  const a = /* @__PURE__ */ B(mt(new e(_(n), _(i))));
  Ye(() => _(n), 'pre', () => {
    P(a, new e(_(n), _(i)), !0);
  });
  function o() {
    const c = _(a).getOptimisticResult(_(i));
    return _(i).notifyOnChangeProps ? c : _(a).trackResult(c);
  }
  const [u, l] = ga(
    // svelte-ignore state_referenced_locally - intentional, initial value
    o(),
  );
  return xr(() => {
    const c = s.current
      ? () => {
        }
      : _(a).subscribe(() => l(o()));
    return _(a).updateResult(), c;
  }), Ye(() => _(i), 'pre', () => {
    _(a).setOptions(_(i));
  }), Ye(() => [_(i), _(a)], 'pre', () => {
    l(o());
  }), u;
}
function $a(t, e) {
  return Ea(t, ra);
}
function us(t, e) {
  Ne(e, !0);
  const r = Ce(e, 'client', 23, () => new vr()); const n = Ce(e, 'children', 7);
  Gn(() => {
    r().mount();
  }), fa(r()), $i(() => {
    r().unmount();
  });
  const s = {
    get client() {
      return r();
    },
    set client(o = new vr()) {
      r(o), se();
    },
    get children() {
      return n();
    },
    set children(o) {
      n(o), se();
    },
  }; const i = rr(); const a = ee(i);
  return Ei(a, n), ct(t, i), Qe(s);
}
Cr(us, { client: {}, children: {} }, [], [], !0);
const xa = /* @__PURE__ */ Zt('<div class="loading svelte-3b4afc"><div class="spinner svelte-3b4afc"></div> <p>Loading users...</p></div>'); const Oa = /* @__PURE__ */ Zt('<div class="error svelte-3b4afc"><div class="error-title svelte-3b4afc">⚠️ Error Loading Users</div> <div> </div></div> <button class="refresh-btn svelte-3b4afc">Try Again</button>', 1); const Sa = (t, e, r) => e(_(r)); const Ca = /* @__PURE__ */ Zt('<div class="user-card svelte-3b4afc"><div class="user-name svelte-3b4afc"> </div> <div class="user-email svelte-3b4afc"> </div> <div class="user-company svelte-3b4afc"> </div></div>'); const Ra = /* @__PURE__ */ Zt('<div class="user-list svelte-3b4afc"></div> <div class="stats svelte-3b4afc"><div><span class="stat-label svelte-3b4afc">Total Users:</span> <span class="stat-value svelte-3b4afc"> </span></div> <div><span class="stat-label svelte-3b4afc">Status:</span> <span class="stat-value svelte-3b4afc"> </span></div></div>', 1); const Pa = /* @__PURE__ */ Zt('<div class="container svelte-3b4afc"><div class="header svelte-3b4afc"><h2 class="title svelte-3b4afc">👥 User Directory</h2> <button class="refresh-btn svelte-3b4afc"> </button></div> <!></div>');
const Ta = {
  hash: 'svelte-3b4afc',
  code: `.container.svelte-3b4afc {font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;padding:20px;background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);border-radius:12px;color:white;max-width:600px;margin:0 auto;}.header.svelte-3b4afc {display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;}.title.svelte-3b4afc {margin:0;font-size:20px;font-weight:700;}.refresh-btn.svelte-3b4afc {padding:8px 16px;background:rgba(255, 255, 255, 0.2);border:1px solid white;border-radius:6px;color:white;font-weight:600;cursor:pointer;transition:all 0.2s;}.refresh-btn.svelte-3b4afc:hover {background:rgba(255, 255, 255, 0.3);transform:translateY(-2px);}.refresh-btn.svelte-3b4afc:disabled {opacity:0.5;cursor:not-allowed;transform:none;}.loading.svelte-3b4afc {text-align:center;padding:40px;font-size:18px;}.spinner.svelte-3b4afc {display:inline-block;width:40px;height:40px;border:4px solid rgba(255, 255, 255, 0.3);border-top-color:white;border-radius:50%;
    animation: svelte-3b4afc-spin 1s linear infinite;margin-bottom:10px;}
  
  @keyframes svelte-3b4afc-spin {
    to { transform: rotate(360deg); }
  }.error.svelte-3b4afc {background:rgba(239, 68, 68, 0.9);padding:16px;border-radius:8px;margin-bottom:12px;}.error-title.svelte-3b4afc {font-weight:700;margin-bottom:4px;}.user-list.svelte-3b4afc {display:flex;flex-direction:column;gap:12px;max-height:400px;overflow-y:auto;}.user-card.svelte-3b4afc {background:rgba(255, 255, 255, 0.15);padding:16px;border-radius:8px;cursor:pointer;transition:all 0.2s;backdrop-filter:blur(10px);}.user-card.svelte-3b4afc:hover {background:rgba(255, 255, 255, 0.25);transform:translateX(4px);}.user-name.svelte-3b4afc {font-weight:700;font-size:16px;margin-bottom:4px;}.user-email.svelte-3b4afc {font-size:14px;opacity:0.9;margin-bottom:4px;}.user-company.svelte-3b4afc {font-size:12px;opacity:0.7;}.stats.svelte-3b4afc {margin-top:16px;padding:12px;background:rgba(0, 0, 0, 0.2);border-radius:8px;display:flex;justify-content:space-between;font-size:14px;}.stat-label.svelte-3b4afc {opacity:0.8;}.stat-value.svelte-3b4afc {font-weight:700;}`,
};
function Fa(t, e) {
  Ne(e, !0), Jn(t, Ta);
  const r = () => Ti(l, '$usersQuery', n); const [n, s] = Fi();
  const i = Ce(e, 'apiUrl', 7, 'https://jsonplaceholder.typicode.com/users');
  const a = new vr({
    defaultOptions: {
      queries: {
        staleTime: 1e3 * 60 * 5,
        // 5 minutes
        refetchOnWindowFocus: !1,
      },
    },
  }); const o = Yn();
  async function u() {
    const h = await fetch(i());
    if (!h.ok) {
      throw new Error('Failed to fetch users');
    }
    const v = await h.json();
    return o('dataloaded', { count: v.length, data: v }), v;
  }
  const l = $a(() => ({ queryKey: ['users', i()], queryFn: u }));
  function c() {
    l.refetch(), o('refresh');
  }
  function p(h) {
    o('userselect', { user: h });
  }
  const f = {
    get apiUrl() {
      return i();
    },
    set apiUrl(h = 'https://jsonplaceholder.typicode.com/users') {
      i(h), se();
    },
  };
  us(t, {
    get client() {
      return a;
    },
    children: (h, v) => {
      const y = Pa(); const b = D(y); const g = H(D(b), 2);
      g.__click = c;
      const m = D(g, !0);
      A(g), A(b);
      const O = H(b, 2);
      {
        const x = (C) => {
          const R = xa();
          ct(C, R);
        }; const N = (C) => {
          const R = rr(); const F = ee(R);
          {
            const K = (X) => {
              const Ct = Oa(); const Rt = ee(Ct); const jt = H(D(Rt), 2); const te = D(jt, !0);
              A(jt), A(Rt);
              const fe = H(Rt, 2);
              fe.__click = c, re(() => gt(te, r().error.message)), ct(X, Ct);
            }; const J = (X) => {
              const Ct = rr(); const Rt = ee(Ct);
              {
                const jt = (te) => {
                  const fe = Ra(); const Ke = ee(fe);
                  Ci(Ke, 5, () => r().data, Oi, (fs, he) => {
                    const de = Ca();
                    de.__click = [Sa, p, he];
                    const Be = D(de); const hs = D(Be, !0);
                    A(Be);
                    const ze = H(Be, 2); const ds = D(ze);
                    A(ze);
                    const Ir = H(ze, 2); const vs = D(Ir);
                    A(Ir), A(de), re(() => {
                      gt(hs, _(he).name), gt(ds, `✉️ ${_(he).email ?? ''}`), gt(vs, `🏢 ${_(he).company.name ?? ''}`);
                    }), ct(fs, de);
                  }), A(Ke);
                  const Fr = H(Ke, 2); const He = D(Fr); const Ar = H(D(He), 2); const ls = D(Ar, !0);
                  A(Ar), A(He);
                  const kr = H(He, 2); const Dr = H(D(kr), 2); const cs = D(Dr, !0);
                  A(Dr), A(kr), A(Fr), re(() => {
                    gt(ls, r().data.length), gt(cs, r().isFetching ? 'Refreshing' : 'Fresh');
                  }), ct(te, fe);
                };
                Ve(
                  Rt,
                  (te) => {
                    r().data && te(jt);
                  },
                  !0,
                );
              }
              ct(X, Ct);
            };
            Ve(
              F,
              (X) => {
                r().error ? X(K) : X(J, !1);
              },
              !0,
            );
          }
          ct(C, R);
        };
        Ve(O, (C) => {
          r().isLoading ? C(x) : C(N, !1);
        });
      }
      A(y), re(() => {
        g.disabled = r().isFetching, gt(m, r().isFetching ? '↻ Loading...' : '↻ Refresh');
      }), ct(h, y);
    },
    $$slots: { default: !0 },
  });
  const d = Qe(f);
  return s(), d;
}
Bn(['click']);
customElements.define('svelte-user-list', Cr(Fa, { apiUrl: {} }, [], [], !0));
export {
  ji as SvelteCounter,
  Fa as UserList,
};
