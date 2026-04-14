export const tokenStorage = {
  get(): string | null {
    if (typeof window === "undefined") {
      return null;
    }

    return (
      localStorage.getItem("accessToken") ??
      sessionStorage.getItem("accessToken")
    );
  },

  save(token: string, remember: boolean) {
    if (typeof window === "undefined") {
      return;
    }

    if (remember) {
      localStorage.setItem("accessToken", token);
      sessionStorage.removeItem("accessToken");
    } else {
      sessionStorage.setItem("accessToken", token);
      localStorage.removeItem("accessToken");
    }
  },

  clear() {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("accessToken");
  },
};
