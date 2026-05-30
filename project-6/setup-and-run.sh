#!/bin/bash
# Setup & Run Script for Project-6

echo "🚀 Project-6 Setup & Run Script"
echo "================================"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_step() {
    echo -e "${BLUE}→ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Check if PostgreSQL is running
print_step "Checking PostgreSQL connection..."
if command -v psql &> /dev/null; then
    if psql -U postgres -d ttcs -c "SELECT 1" &>/dev/null; then
        print_success "PostgreSQL is running and database 'ttcs' exists"
    else
        print_warning "Creating database 'ttcs'..."
        createdb -U postgres ttcs
        print_success "Database created"
    fi
else
    print_warning "PostgreSQL client not found. Please ensure PostgreSQL is installed and running."
fi

echo ""
echo -e "${BLUE}Choose what to run:${NC}"
echo "1) Backend only (Spring Boot)"
echo "2) Frontend only (Next.js)"
echo "3) Both Backend & Frontend"
echo "4) Setup Backend"
echo "5) Setup Frontend"

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        print_step "Starting Backend (Spring Boot)..."
        cd project-6-backend
        mvn spring-boot:run
        ;;
    2)
        print_step "Starting Frontend (Next.js)..."
        cd project-6
        npm run dev
        ;;
    3)
        print_step "Starting Backend..."
        cd project-6-backend
        mvn spring-boot:run &
        BACKEND_PID=$!

        sleep 5

        print_step "Starting Frontend..."
        cd ../project-6
        npm run dev &
        FRONTEND_PID=$!

        print_success "Both services are running!"
        print_step "Backend: http://localhost:4000"
        print_step "Frontend: http://localhost:3000"

        wait
        ;;
    4)
        print_step "Setting up Backend..."
        cd project-6-backend
        print_step "Building with Maven..."
        mvn clean install
        print_success "Backend setup complete!"
        ;;
    5)
        print_step "Setting up Frontend..."
        cd project-6
        print_step "Installing dependencies..."
        npm install
        print_success "Frontend setup complete!"
        ;;
    *)
        print_warning "Invalid choice"
        exit 1
        ;;
esac

echo ""
print_success "Done!"

