// @holdfast/protocol — wire-format types shared by client and signaling server.
//
// This package is intentionally zero-dependency. It exports only TypeScript
// types and a couple of pure helpers. Runtime validation of incoming bytes
// happens at the parse boundary (signaling server, DataChannel listener) —
// see those packages for parser implementations.

export * from './primitives.js';
export * from './envelope.js';
export * from './entities.js';
export * from './invite.js';
export * from './signaling.js';
export * from './hold.js';
