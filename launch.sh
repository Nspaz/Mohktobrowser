#!/usr/bin/env bash

# MSDOS-style Mohktobrowser Launcher
# Can be run directly or copy-pasted into terminal

# Clear screen
clear

# ANSI color codes
CYAN='\033[36m'
GREEN='\033[32m'
YELLOW='\033[33m'
MAGENTA='\033[35m'
RESET='\033[0m'
BRIGHT='\033[1m'
DIM='\033[2m'

# MSDOS-style ASCII art banner
echo -e "${CYAN}${BRIGHT}"
echo '╔═══════════════════════════════════════════════════════════════════╗'
echo '║                                                                   ║'
echo '║   ███╗   ███╗ ██████╗ ██╗  ██╗██╗  ██╗████████╗ ██████╗          ║'
echo '║   ████╗ ████║██╔═══██╗██║  ██║██║ ██╔╝╚══██╔══╝██╔═══██╗         ║'
echo '║   ██╔████╔██║██║   ██║███████║█████╔╝    ██║   ██║   ██║         ║'
echo '║   ██║╚██╔╝██║██║   ██║██╔══██║██╔═██╗    ██║   ██║   ██║         ║'
echo '║   ██║ ╚═╝ ██║╚██████╔╝██║  ██║██║  ██╗   ██║   ╚██████╔╝         ║'
echo '║   ╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝          ║'
echo '║                                                                   ║'
echo '║                    ▄▄▄▄▄ BROWSER SYSTEM v1.0 ▄▄▄▄▄                ║'
echo '║                                                                   ║'
echo '╚═══════════════════════════════════════════════════════════════════╝'
echo -e "${RESET}"

# Animated loading
echo -e "${GREEN}"
frames=('▱▱▱▱▱▱▱▱▱▱' '▰▱▱▱▱▱▱▱▱▱' '▰▰▱▱▱▱▱▱▱▱' '▰▰▰▱▱▱▱▱▱▱' '▰▰▰▰▱▱▱▱▱▱' '▰▰▰▰▰▱▱▱▱▱' '▰▰▰▰▰▰▱▱▱▱' '▰▰▰▰▰▰▰▱▱▱' '▰▰▰▰▰▰▰▰▱▱' '▰▰▰▰▰▰▰▰▰▱' '▰▰▰▰▰▰▰▰▰▰')
for frame in "${frames[@]}"; do
    echo -ne "\r  [SYSTEM] Initializing... ${frame} "
    sleep 0.08
done
echo -e "✓${RESET}"

# MoneyMe prompt
echo -e "\n${YELLOW}  ┌─────────────────────────────────────────────────────────────┐"
echo -e "  │                                                             │"
echo -e "  │  ${BRIGHT}🏦  NAVIGATION PROMPT: MONEYME DETECTED${RESET}${YELLOW}                │"
echo -e "  │                                                             │"
echo -e "  └─────────────────────────────────────────────────────────────┘${RESET}"

echo -e "\n${MAGENTA}  [PROMPT] Navigate to MoneyMe? ${BRIGHT}(Y/N)${RESET}${MAGENTA}:${RESET}"
echo -n "  > "
read -r answer

# Process answer
answer=$(echo "$answer" | tr '[:lower:]' '[:upper:]')

if [[ "$answer" == "Y" || "$answer" == "YES" ]]; then
    echo -e "\n${GREEN}  [ACTION] Opening MoneyMe...${RESET}"
    echo -e "${DIM}  URL: https://moneyme.com.au/u?c=MTQwMjE4MTM${RESET}\n"
    
    # Open URL in default browser
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open "https://moneyme.com.au/u?c=MTQwMjE4MTM"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        xdg-open "https://moneyme.com.au/u?c=MTQwMjE4MTM" 2>/dev/null
    elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
        start "https://moneyme.com.au/u?c=MTQwMjE4MTM"
    fi
else
    echo -e "\n${GREEN}  [ACTION] Staying on current system...${RESET}"
    echo -e "${CYAN}  [INFO] Opening Mokh Browser...${RESET}\n"
    
    # Open index.html in default browser
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open "index.html"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        xdg-open "index.html" 2>/dev/null
    elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
        start "index.html"
    fi
fi

# Closing message
sleep 1
echo -e "${CYAN}"
echo '  ┌─────────────────────────────────────────────────────────────┐'
echo '  │                                                             │'
echo '  │             MOHKTO BROWSER SYSTEM - SESSION END             │'
echo '  │                   Thank you for using!                      │'
echo '  │                                                             │'
echo '  └─────────────────────────────────────────────────────────────┘'
echo -e "${RESET}\n"
