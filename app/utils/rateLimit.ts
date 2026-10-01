interface RateLimitOptions {
  intervalMs: number;
  maxRequests: number;
}

interface RequestLog {
  count: number;
  resetTime: number;
}

const tracker = new Map<string, RequestLog>();

// Periodic cleanup of expired rate limit logs every 5 minutes
if (typeof globalThis !== 'undefined') {
  const g = globalThis as any;
  if (!g.__rateLimitCleanerSet) {
    g.__rateLimitCleanerSet = true;
    setInterval(() => {
      const now = Date.now();
      for (const [ip, log] of tracker.entries()) {
        if (now > log.resetTime) {
          tracker.delete(ip);
        }
      }
    }, 5 * 60 * 1000);
  }
}

export function checkRateLimit(
  ip: string,
  options: RateLimitOptions
): { success: boolean; remaining: number; resetMs: number } {
  const now = Date.now();
  const log = tracker.get(ip);

  if (!log || now > log.resetTime) {
    tracker.set(ip, {
      count: 1,
      resetTime: now + options.intervalMs,
    });
    return { success: true, remaining: options.maxRequests - 1, resetMs: options.intervalMs };
  }

  if (log.count >= options.maxRequests) {
    return { success: false, remaining: 0, resetMs: log.resetTime - now };
  }

  log.count += 1;
  return { success: true, remaining: options.maxRequests - log.count, resetMs: log.resetTime - now };
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}

export const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};
