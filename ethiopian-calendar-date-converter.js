"use strict";

const M = Object.defineProperty;
const w = (t, e, n) => (e in t ? M(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : (t[e] = n));
const r = (t, e, n) => (w(t, typeof e != "symbol" ? e + "" : e, n), n);

const p = 60 * 60 * 1e3,
    s = 24 * p,
    m = 365 * s,
    E = 366 * s,
    h = 3 * m + E,
    $ = new Date("December 9, 2012").getTime() - new Date("April 1, 2005").getTime(),
    f = new Date(1900, 2, 1),
    l = new Date(2100, 1, 1);

function y(t) {
    return {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday"
    }[t];
}

function Y(t) {
    return {
        1: "Meskerem ",
        2: "Tikimt ",
        3: "Hidar ",
        4: "Tahsas ",
        5: "Tir ",
        6: "Yekatit ",
        7: "Megabit ",
        8: "Meyazya ",
        9: "Ginbot ",
        10: "Sene ",
        11: "Hamle ",
        12: "Nehase ",
        13: "Pagume "
    }[t];
}

class D {
    constructor(e, n, i, o = 0, u = 0, a = 0) {
        r(this, "year");
        r(this, "month");
        r(this, "date");
        r(this, "hour");
        r(this, "minute");
        r(this, "second");
        r(this, "toTimeString", () =>
            this.hour < 13
                ? c(this.hour) + ":" + c(this.minute) + ":" + c(this.second) + " a.m."
                : c(this.hour - 12) + ":" + c(this.minute) + ":" + c(this.second) + " p.m."
        );
        r(this, "toDateString", () => Y(this.month) + this.date + ", " + this.year);
        r(this, "toDateWithDayString", () => `${y(this.getDay())}, ${this.toDateString()}`);
        r(this, "toString", () => `${this.toDateString()}, ${this.toTimeString()}`);
        r(this, "toFullDateTimeString", () => `${this.toString()}, ${y(this.getDay())} .`);
        r(this, "getDay", () => (this.year + 2 * this.month + this.date + b(this.year)) % 7);
        if (i > 30) throw new Error(`Invalid Ethiopian Date: ${i}`);
        if (n < 1 || n > 13) throw new Error(`Invalid Ethiopian Month: ${n}`);
        this.year = e > 200 ? e : e + 1900;
        this.month = n;
        this.date = i;
        this.hour = o;
        this.minute = u;
        this.second = a;
    }

    static now() {
        const e = new Date();
        return this.fromEuropeanDate(e);
    }

    static fromEuropeanDate(e) {
        return d(e);
    }

    toEuropeanDate() {
        return O(this);
    }
}

function b(t) {
    return -Math.floor((2023 - t) / 4);
}

function T(t) {
    return t >= f && t <= l;
}

function d(t) {
    if (!T(t)) throw `Out of range input year: ${t.getFullYear()}`;
    const e = t.getTime() - new Date(Date.UTC(1971, 8, 12)).getTime(),
        n = Math.floor(e / h),
        i = Math.floor((e - n * h) / m);
    i === 4 && (i = 3);
    const o = Math.floor((e - n * h - i * m) / (30 * s)),
        u = Math.floor((e - n * h - i * m - o * 30 * s) / s);
    let a = t.getHours();
    return a < 0 && (a += 24), new D(i + 4 * n + 1964, o + 1, u + 1, a, t.getMinutes(), t.getSeconds());
}

function O(t) {
    const e = new Date(new Date(Date.UTC(t.year, t.month - 1, t.date)).getTime() + $);
    if (t.month === 13) {
        let n;
        t.year % 4 === 3 ? (n = 6) : (n = 5);
        if (t.date > n) throw "Pagume Only has " + n + " days at year " + t.year + ". Please select another day.";
    }
    for (let n = -8; n < 9; n++) {
        const i = new Date(e.getTime() + n * s),
            o = i.getTime() - new Date(Date.UTC(1971, 8, 12)).getTime(),
            u = Math.floor(o / h);
        let a = Math.floor((o - u * h) / m);
        a === 4 && (a = 3);
        const g = Math.floor((o - u * h - a * m) / (30 * s)),
            S = Math.floor((o - u * h - a * m - g * 30 * s) / s);
        if (t.date === S + 1 && t.month === g + 1) {
            if (!T(i)) throw `Out of range input year: ${i.getFullYear()}`;
            return i;
        }
    }
    throw `Date not converted: ${t.year},  ${t.month},  ${t.date}, `;
}

function c(t, e = 2) {
    return String(t).padStart(e, "0");
}

const k = {
    ethiopianCalendarYear: { min: () => d(f).year, max: () => d(l).year },
    europeanCalendarDate: { min: f, max: l }
};

const EthDateTime = D;
const limits = k;

// Export the EthDateTime class and other variables directly
window.EthDateTime = EthDateTime;
window.limits = limits;
